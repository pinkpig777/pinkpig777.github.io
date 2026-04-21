# Storage Design for a Hybrid Login + Compute Node (Cluster Setup)

## Overview

This document captures the reasoning, design decisions, and implementation plan for setting up storage on a GPU server that initially serves as both a **login node** and a **compute node**, with future expansion into a multi-node cluster.

The goal is to design a storage layout that is:

- Scalable
- Maintainable
- Fault-tolerant (to a reasonable extent)
- Aligned with real-world ML/AI workloads

---

# Key Concepts

## LVM (Logical Volume Manager)

**Definition**  
LVM is a storage abstraction layer that allows flexible allocation of disk space.

**Structure**
```
Physical Disk → Physical Volume (PV) → Volume Group (VG) → Logical Volume (LV)
```

**Why LVM**
- Flexible resizing (expand volumes easily)
- Ability to pool multiple disks
- Cleaner abstraction compared to fixed partitions

**Trade-offs**
- More complex than traditional partitioning
- Requires understanding of PV / VG / LV layers
- Filesystem limitations still apply (e.g., XFS cannot shrink)

---

## ext4

**Definition**  
ext4 is the default Linux filesystem, optimized for stability and general-purpose workloads.

**Strengths**
- Mature and widely supported
- Reliable recovery tools (`fsck`)
- Good performance for mixed workloads
- Supports resizing (including shrinking, with effort)

**Weaknesses**
- Not optimized for very high-throughput large-file workloads
- Can degrade under heavy parallel I/O compared to XFS

**Best suited for**
- System partitions
- Conservative environments
- General-purpose storage

---

## XFS

**Definition**  
XFS is a high-performance filesystem optimized for large files and parallel I/O.

**Strengths**
- Excellent performance for large files
- Scales well with concurrent workloads
- Common in production servers and clusters
- Works well with container workloads (Docker, ML pipelines)

**Weaknesses**
- Cannot shrink (practically)
- Recovery tooling less familiar for many users
- Requires more careful upfront planning

**Best suited for**
- Dataset storage
- Model storage
- Scratch / temporary workloads
- Container storage

---

## Cluster Storage Considerations

In a cluster environment, storage is typically divided into:

### Persistent Storage (`/data`)
- Long-term data
- Models, datasets, shared resources
- Should not be casually deleted

### Ephemeral Storage (`/scratch`)
- Temporary computation data
- Intermediate outputs, checkpoints, cache
- Safe to delete when full

### System Storage (`/`)
- OS and critical services
- Must remain stable and isolated

---

# Design Requirements

Given constraints:

- Total disk: ~2TB
- Root already allocated: 200GB (LVM)
- Remaining: ~1.8TB
- Node role:
  - Login node (interactive usage)
  - Compute node (jobs, training, inference)
- Future:
  - Additional compute nodes will be added
  - Storage scaling will be done via new disks or NAS (not shrinking partitions)

---

# Storage Design Options Considered

## Option 1: Single Partition (All-in-One)

```
/data (everything)
```

**Rejected because**
- No isolation between workloads
- High risk of disk exhaustion affecting all services
- Difficult to manage and clean

---

## Option 2: Split by Directory Only

```
/data/models
/data/tmp
/data/cache
```

**Rejected because**
- No hard isolation
- One workload can consume all space
- Operational risk in multi-user environments

---

## Option 3: Partition Separation (Chosen Approach)

```
/        → system
/data    → persistent data
/scratch → temporary data
```

**Why this works**
- Clear separation of concerns
- Failure isolation
- Matches cluster best practices

---

# Filesystem Decision

## Initial Debate

Should `/data` use:
- ext4 (safe)
- or XFS (performance-oriented)?

## Key Considerations

### 1. Workload Characteristics
- Large files (models, datasets)
- High I/O throughput
- Container-heavy (Docker, vLLM)
- Multi-user environment

### 2. Operational Strategy
- No reliance on shrinking volumes
- Future scaling via:
  - Additional SSDs
  - NAS integration

### 3. Trade-off Decision

| Factor              | ext4            | XFS                         |
|-------------------|----------------|------------------------------|
| Stability          | High           | High                         |
| Performance        | Good           | Better for large I/O         |
| Resize (shrink)    | Possible       | Not supported                |
| Operational risk   | Lower          | Slightly higher              |

---

# Final Decision

## Filesystem Layout

```
/            → ext4 (200GB, LVM)
/data        → XFS (~1.1TB, LVM)
/scratch     → XFS (~700GB, LVM)
```

## Why this layout

### `/` (system, ext4)
- Stability is critical
- Minimal performance requirement
- Easier recovery

### `/data` (XFS)
- Stores large, persistent data
- Optimized for throughput
- Matches workload characteristics

### `/scratch` (XFS)
- High write/delete frequency
- Temporary workloads
- Performance preferred over recoverability

---

# LVM Layout

```
Disk (~2TB)
 └── PV
      └── VG (vg_cluster)
           ├── LV root      → 200G → ext4
           ├── LV data      → ~1.1T → xfs
           └── LV scratch   → ~700G → xfs
```

---

# Operational Guidelines

## Docker

Move Docker data root to:
```
/data/docker
```

Reason:
- Avoid filling system partition
- Docker images and layers grow quickly

---

## Workload Placement

### `/data`
- models
- datasets
- docker storage
- logs
- shared artifacts

### `/scratch`
- temporary outputs
- checkpoints
- build artifacts
- cache
- job runtime files

---

## Slurm Job Example

```bash
export TMPDIR=/scratch/$USER/$SLURM_JOB_ID
mkdir -p $TMPDIR
```

---

# Scaling Strategy

Future expansion will not rely on resizing existing volumes.

Instead:

- Add new SSDs → extend LVM or mount separately
- Integrate NAS → mount shared storage
- Separate roles:
  - compute nodes (heavy workloads)
  - login node (lightweight usage)

---

# Lessons Learned

1. Partition separation matters more than filesystem choice  
2. Workload-driven design is more important than theoretical performance  
3. XFS is appropriate when scaling strategy avoids shrink operations  
4. Docker must not live on the system partition  
5. Cluster thinking requires failure isolation, not just performance  

---

# Conclusion

This design balances:

- Stability (`ext4` for system)
- Performance (`XFS` for data and scratch)
- Flexibility (LVM)
- Scalability (future storage expansion)

It is not the simplest setup, but it reflects a production-oriented mindset aligned with modern ML infrastructure.
