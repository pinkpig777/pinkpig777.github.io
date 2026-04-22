# Storage Design for a Hybrid Login + Compute Node (Cluster Setup)

## Overview

This document captures the reasoning, design decisions, and implementation details for setting up storage on a GPU server that initially serves as both a **login node** and a **compute node**, with future expansion into a multi-node cluster.

Instead of following a rigid "textbook" layout, we intentionally designed a system that balances:

- Performance
- Flexibility
- Operational simplicity
- Future scalability

---

# Key Concepts

## LVM (Logical Volume Manager)

LVM provides a flexible abstraction layer over physical storage:

```
Physical Disk → PV → VG → LV
```

It allows:

- Pooling storage into a single volume group
- Dynamically allocating logical volumes
- Future expansion by adding disks

However:

> LVM does not eliminate filesystem constraints (e.g., XFS cannot shrink)

---

## ext4

A general-purpose filesystem focused on:

- Stability
- Simplicity
- Mature recovery tooling

Best suited for:
- System partitions
- Conservative environments

---

## XFS

A high-performance filesystem designed for:

- Large files
- High throughput
- Parallel I/O workloads

Key characteristics:

- Excellent for data-intensive systems
- Widely used in production clusters
- Supports project quota (pquota)

Limitations:

- Cannot shrink volumes
- Requires more deliberate planning

---

## Project Quota (pquota)

XFS provides **project-based quota**, which allows limiting disk usage at the directory level.

Unlike traditional user/group quota:

- Applies to directory trees
- Suitable for workload isolation (e.g., `/data` vs `/scratch`)

---

# Problem Context

We are working with:

- ~2TB local NVMe storage
- 200GB already allocated for system (`/`)
- ~1.8TB remaining

Node role:

- Login node (interactive usage)
- Compute node (jobs, experiments)

Future direction:

- Expand into multi-node cluster
- Add storage via SSD or NAS
- Avoid reliance on resizing/shrinking partitions

---

# Design Options Considered

## Option 1: Hard Partition / LVM Split

```
/data
/scratch
```

Separate logical volumes for:

- Persistent data
- Temporary data

### Pros
- Strong isolation
- Easy observability (`df -h`)
- Clear mental model

### Cons
- Requires early capacity decisions
- XFS cannot shrink → misallocation is costly
- Less flexible during early-stage usage

---

## Option 2: Directory-based Separation Only

```
/data
/data/scratch
```

### Pros
- Simple
- No upfront partitioning decisions

### Cons
- No isolation
- High risk of disk exhaustion
- Not suitable for multi-user environments

---

## Option 3: Single XFS + Project Quota (**Chosen**)

```
/data
/data/persistent
/data/scratch
```

Use:

- XFS as the underlying filesystem
- Project quota (pquota) to enforce limits

---

# Decision Trade-offs

This decision is fundamentally a trade-off between:

### 1. Isolation vs Flexibility

| Approach             | Isolation | Flexibility |
|---------------------|----------|------------|
| Partition split     | Strong   | Low        |
| XFS + pquota        | Medium   | High       |

We chose **flexibility** because:

- Early-stage workload is uncertain
- Data vs scratch usage ratio may evolve
- Repartitioning later is costly

---

### 2. Operational Safety vs Adaptability

Partition-based design:

- Safer by default
- Enforced by the OS

Quota-based design:

- Requires correct configuration
- Depends on operational discipline

We accepted this trade-off because:

> Our system is still evolving, and adaptability is more valuable than strict enforcement at this stage.

---

### 3. Observability vs Control

Partition split:

```
df -h
```

→ Immediate visibility

Quota-based:

```
xfs_quota -x -c "report"
```

→ Requires tooling

We accept slightly reduced observability in exchange for:

- Dynamic capacity management
- Avoiding premature optimization

---

### 4. Production Convention vs Practical Engineering

Typical production clusters use:

```
/data
/scratch
```

Separate mount points.

We intentionally diverge because:

- This is an early-stage system
- We prioritize iteration speed over convention
- We plan to evolve toward stricter isolation later if needed

---

# Decision Rationale

We chose **XFS + project quota** based on the following reasoning:

---

## 1. Workload is large-file and throughput-heavy

The system handles:

- Models (GB–TB scale)
- Datasets
- Checkpoints
- Container layers

XFS is well-suited for:

- Sequential I/O
- Large file handling
- High throughput operations

---

## 2. Need for dynamic capacity allocation

We do not yet know:

- Exact ratio of persistent vs temporary data
- Future workload patterns

Using pquota allows:

- Adjusting limits without repartitioning
- Avoiding irreversible decisions

---

## 3. Scaling strategy does not depend on shrinking

We explicitly decided:

- No reliance on shrinking volumes

- Scaling will be done by:
  - Adding SSDs
  - Integrating NAS
  
This removes a key disadvantage of XFS.

---

## 4. Early-stage system prioritizes iteration

At this stage:

- Requirements are evolving
- Usage patterns are not fully stable

We optimize for:

> Speed of iteration over rigid correctness

---

## 5. Acceptable level of risk

We acknowledge:

- Quota is not as strong as partition isolation
- Misconfiguration is possible

But we mitigate this by:

- Clear directory structure
- Explicit usage guidelines
- Monitoring and documentation

---

# Final Layout

```
/            → ext4 (system)
/data        → XFS
  /persistent
  /scratch
```

Quota is enforced via:

- XFS project quota
- Separate limits for persistent and scratch

---

# Operational Guidelines

## Directory Usage

### Persistent Data
```
/data/persistent
```

- models
- datasets
- repositories
- shared artifacts
- Docker root

---

### Temporary Data
```
/data/scratch
```

- checkpoints
- cache
- build artifacts
- intermediate outputs

---

## Slurm Example

```bash
export TMPDIR=/data/scratch/$USER/$SLURM_JOB_ID
mkdir -p $TMPDIR
```

---

## Docker

Docker root should be moved to:

```
/data/persistent/docker
```

---

# Future Evolution

This design is not final.

Possible future changes:

- Split `/data` and `/scratch` into separate volumes
- Introduce network storage (NAS / distributed FS)
- Move heavy workloads to dedicated compute nodes

---

# Lessons Learned

1. Storage design is about trade-offs, not absolutes  
2. Filesystem choice must match workload characteristics  
3. Early-stage systems benefit from flexibility  
4. Isolation can be introduced later, but rigidity is hard to undo  
5. Production design evolves — it is not fixed from day one  

---

# Conclusion

We chose **XFS + project quota** because it provides:

- High performance for data-heavy workloads
- Flexibility during early-stage development
- A balance between structure and adaptability

> Instead of optimizing for a perfect final state, we optimized for a system that can evolve.
