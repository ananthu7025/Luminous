---
title: 'How We Architected a Multi-Role LMS on Next.js for 500+ Concurrent Users'
publishDate: 'April 10, 2024'
thumbnail: '/images/blog/blog-1.png'
tag: 'Engineering'
author: 'Luminous Team'
authorImage: '/images/avatar/avatar-1.png'
readTime: '8 min'
description: 'A deep dive into the architectural decisions for scaling a Next.js LMS platform.'
slug: 'architecting-multi-role-lms'
---

When NCAMadeEasy came to us, they had a content problem masquerading as a technology problem. Their instinct was to ask for "a better website." What they actually needed was a learning platform — one that could handle multiple user types, high-bitrate video, payment processing, and progress tracking simultaneously without falling over.

### The Three-Role Problem
Most LMS tutorials show you how to build for one user type. Real platforms need to serve radically different user experiences from the same codebase. Our three roles were Super Admin (platform management, analytics, content oversight), Instructor (course creation, student monitoring, quiz management), and Student (course browsing, video consumption, progress tracking, certification).

The key decision was where to enforce role separation. We chose to do it at three layers: middleware route protection, API-level permission checks, and UI-level conditional rendering. This meant a student could never accidentally access instructor tooling, and an instructor could never touch platform-wide settings.

### Video Delivery Architecture
Raw video upload to the platform was a non-starter for scale. We built a pipeline: upload to AWS S3, trigger a Lambda function to kick off MediaConvert transcoding into adaptive bitrate HLS, deliver via CloudFront CDN. Students get smooth playback at whatever their connection supports.

Progress tracking was tied to the video player — we used a custom hook that fires a debounced API call every 30 seconds of watch time, storing module completion state in MongoDB. This ensured progress survived page refreshes and device switches.

### Payment and Enrollment Flow
We used Stripe Checkout for the purchase flow and Stripe Webhooks for enrollment activation. The key architectural decision here was to never trust the frontend. Enrollment is only activated when our webhook handler receives a confirmed checkout.session.completed event from Stripe.
