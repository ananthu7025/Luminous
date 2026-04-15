---
title: 'Architecting a Multi-Role LMS: Lessons from NCAMadeEasy'
publishDate: 'April 10, 2024'
thumbnail: '/images/blog/architecting-multi-role-lms.png'
tag: 'Architecture'
author: 'Luminous Team'
authorImage: '/images/avatar/avatar-1.png'
readTime: '8 min'
description: 'A deep dive into the technical architecture of a scalable, high-performance Learning Management System.'
slug: 'architecting-multi-role-lms'
---

When we started building the NCAMadeEasy platform, we weren't just building a website. We were building a high-performance educational engine that had to handle three distinct user roles, low-latency video delivery, and secure automated billing.

### The Multi-Role Challenge
In a production LMS, role-based access control (RBAC) is more than just a permission list. It's about data isolation. A student should never see the analytics dashboard of an instructor. We implemented an RBAC system using JWT (JSON Web Tokens) where the role is encoded into the token payload, allowing our Next.js middleware to perform lightning-fast, edge-side authorization checks.

### Video Pipeline: From S3 to the Student
One of the core requirements was a seamless video experience. We built an automated pipeline where raw videos uploaded to AWS S3 trigger a Lambda function for transcoding into HLS format. This ensures that whether a student is on a high-speed fiber connection in Toronto or a mobile network in a rural area, they get the best possible bitrate without buffering.

### Payment and Automation
By integrating the Stripe API directly into our Next.js backend, we eliminated the need for manual enrollment. When a checkout is successful, Stripe webhooks trigger a database update that instantly unlocks the course for the student and sends an automated welcome sequence. This reduced admin overhead for the NCAMadeEasy team by nearly 90%.
