---
title: Technical API (CryptoManana Docs)
description: Technical API Documentation.
redirect_from:
  - /en/docs/technical-api/
  - /en/docs/technical-api
breadcrumb:
  home:
    title: Home
    url: /
  manual:
    title: Framework Manual
    url: /docs/
  current:
    title: Technical API
    url: /docs/technical-api
navigation:
  previous:
    title: Previous
    url: /docs/miscellaneous-examples
  next:
    title: Start Over
    url: /docs/
---

{% include breadcrumbs.html %}

### [](#technical-api){:.book_mark}Technical API ###

&nbsp;&nbsp;&nbsp;&nbsp;After knowing how to use the components and have reviewed the basic cryptography model usse
cases, this is the last step of the tutorial/manual. Before continuing, please make sure to make a fast review of the
technical API documentation:

- [The Project's API Documentation](../api/namespaces/CryptoManana.html "The API Documentation"){:target="_blank"};
- [The Project's Eco System](../api/graphs/class.html "The Eco System UML"){:target="_blank"}.

### [](#performance-and-security-tips){:.book_mark}Performance and Security Tips ###

&nbsp;&nbsp;&nbsp;&nbsp;Here are a few useful tips for the Guru types:

- Do not make things more complex than they are, keep it simple as possible;
- Always update your OpenSSL/Sodium Library to the latest version;
- Always update your Operating System and Kernel;
- Always update your containers and services;
- Always update your PHP and used extensions;
- Always update your Composer dependencies;
- Separate the dependencies per environment;
- Backup vigorously and preferably often;
- Live by the least privilege principle;
- Never output system technical errors;
- Never expose your platform versioning;
- Never trust the users' input, it's evil;
- Never reuse keys, salts or nonce strings;
- Harvest the power of Zend OPcache/JIT;
- Use the Composer APCu optimization;
- Increase the resources for PHP;
- Increase the realpath cache;
- Be paranoid, stay paranoid.

&nbsp;&nbsp;&nbsp;&nbsp;**Thank you for your patience! I hope that you like the software framework and I wish you happy
encrypting/securing. ;]**

{% include section_navigation_buttons.html %}