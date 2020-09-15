# [Preparing Software Artifacts using QEMU](#/blog/artifact-vms) {.title}

Arjen Rouvoet -- August 25 2020

---

Unlike in many other scientific fields, reproducing experiments can
_potentially_ be very cheap in computer science. This is a fantastic feature!
Reading papers always prompts questions of the kind 'can system X handle problem
Y?'. Just giving problem Y to system X is a much easier---and more fun---way of
answering that question than to try and work it out on paper.

Going from 'potentially reproducible' to 'actually reproducible over time and
different systems' is however more of a leap than one would hope. I guestimate
that the average number of errors that a researcher is willing to solve to get
any given system X to run is less than the average number of errors it produces.

Reliable software deployment is just _hard_ and takes iterations of feedback
from users on different systems and bugfixes. Research products seldom have a
sufficiently large user base to iron out these deployment kinks, and often do
not see sufficient maintenance over time.
For this reason it is usually a good idea to provide research software artifacts
not just as a source package, but also in deployed form on a virtual system.

Provisioning a virtual machine is conceptually simple, but (as is often the case
in dev ops), has plenty of pitfalls and gotchas. This blog post is not a
this-is-a-new-and-fantastic-way-of-provisioning-VMs sort of post (we might get to that
in the future), but rather a basic avoid-these-traps sort of post that I have
written with the sole purpose of saving you time. At the end of this
post I briefly discuss some more advanced tools for improving the process of
provisioning, but are outside the scope of this particular post.

I tend to not do things perfectly right the first time, and so I will do my best
to present a process for preparing a VM that makes it easy to repeat it if
necessary, without actually relying yet on specialized tools for provisioning
the guest.

## Basic Concepts of QEMU

The base VM image that the international conference on functional programming
(ICFP) provided this year was provisioned using QEMU, which appears to be
_the preferred_ cross-platform way to do this nowadays.

In provisioning with the VM we will have to deal with a number of parties.  In
particular, we have to deal with (1) the _host_, (2) the _hypervisor_, (3) the
_accelerator_, and finally (4) the _guest_. The host runs the hypervisor, which
somehow emulates the guest, whose data resides on an image. Our
hypervisor/emulator is QEMU. It offers various accelerators that determine how
the emulation works. A reliable (but slow) cross-platform method is to simulate
the guest processor entirely using the 'tiny code generator' (`-accel tcg`).
Usually you want to use hardware acceleration using kernel base virtualization
(`-accel kvm`) on Linux, the hardware virtualization framework (`-accel hfv`) on
macOS, or the windows hypervisor platform (`-accel whpx`) on Windows.

These concepts come together in the command that one uses to start up a guest.
For example, if we want to use KVM, we would invoke QEMU as follows
(taken from the ICFP '20 `start.sh` script):

```bash
qemu-system-x86_64 \
        -name   "Artifact" \
        -accel  kvm \
        -cpu    max \
        -m      4096 \
        -hda    box.qcow2 \
        -device e1000,netdev=net0 \
        -netdev user,id=net0,hostfwd=tcp::5555-:22 \
        $@
```

Besides naming the guest system and choosing the acceleration method, it selects
the host's CPU to run on, and the amount of memory to make available to the
guest, and the location of the image that contains the guest (`box.qcow2`). It
also adds and names the (default, I believe) network card, so that we can
forward port 5555/TCP on the host to the default SSH port (22/TCP) on the guest.

## Images as Seen from the Outside: Format & Tools

We now turn our attention to the guest image `box.qcow2`. First we look into
the format of the image, and the QEMU tools for manipulating images from the
side of the host. Then we look at some tools that we need on the guest-side of
the VM.

### Image Formats

QEMU supports a variety of image formats and can convert between them.
For basic use, there are two formats that one should be aware of: _raw_ and
_qcow2_.

The raw image format ensures that the guest and host see exactly the same
bytes. This is useful, for example, if you want to be able to mount the guest
image in the host as a loop device, or if need little overhead for disk IO
in the guest. The downside of raw images is that consume the full
amount of space that is allocated to the guest on the host's disk. If you care
about sharing your VM, this is not ideal.

On the other hand, the qcow{,2,3} image format is a copy-on-write format that
can grow dynamically. This means that you can create an image of 20Gb with good
conscience, create a file-system on the guest that sees the full 20Gb, and it
will only require little space on the host's disk. As you start writing non-zero
bits to the guest's drive, the qcow formatted image will grow dynamically, upto
~20Gb.

Creating an image of a specified size is done using the following command:

```bash
qemu-img create -f qcow2 box.qcow2 20G
```

We can use the `convert` command to go between formats, or to compress a qcow
image:

```
# convert from raw to qcow2
qemu-img convert -O qcow2 box.img box.qcow2

# compress a qcow image, reclaiming zero bits for the host
qemu-img convert -O qcow2 box.qcow2 box-compressed.qcow2
```

## Backing Images & Snapshots

The workflow that I would propose for creating an artifact VM, is as follows:

- Create a qcow2 image `base.qcow2` for the OS of your choice.
- Install the OS on `base.qcow2`, set-up a default user and ssh access.
- Clean the base image, zero-out all the free space and compress the result.
- Create a qcow2 image `box.qcow2` for the artifact, _backed_ by the base.
  This effectively acts like a snapshot, using the copy-on-write file system
  features to keep the base image untouched.
  This makes it easy to start cleanly if things go sideways, or if you need to
  provision another artifact in the future.
- Start `box.qcow2` and provision your guest.
- Clean the guest, zero-out all the free space.
- Merge the `box.qcow` with (a copy of) the base and compress the image for sharing.

If you want to do any testing that would pollute the guest, you can create
another snapshot and do your testing there afterwards.

## Images as Seen from the Inside

### Resizing an Image (Shrinkwrap before Sharing!)

### Provisioning the Guest

## Better Automated Provisioning

## Summary

## Conclusion

## Resources

- [QEMU homepage](https://www.qemu.org/)
- [Arch Linux Wiki on QEMU](https://wiki.archlinux.org/index.php/QEMU)

## Appendix: Advice to Artifact Evaluation Committees
