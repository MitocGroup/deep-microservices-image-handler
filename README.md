deep-microservices-dynamic-image
================================

[![Build Status](https://travis-ci.com/MitocGroup/deep-microservices-dynamic-image.svg?token=K6deyi9kwkfxRyXwcv6c&branch=master)](https://travis-ci.com/MitocGroup/deep-microservices-dynamic-image)
[![Test Coverage](https://codeclimate.com/repos/57985bde6b32cb4596005586/badges/481fff4d379f8b04e9c3/coverage.svg)](https://codeclimate.com/repos/57985bde6b32cb4596005586/coverage)

deep-microservices-dynamic-image is a microservice designed to provide dynamic image management capabilities
in applications built on top of [DEEP Framework](https://github.com/MitocGroup/deep-framework).
It could be used either as a standalone application or as a dependency in other deep-microservices.


## Getting Started

### Step 1. Pre-requisites

- [x] [Create an Amazon Web Services account](https://www.youtube.com/watch?v=WviHsoz8yHk)
- [x] [Configure AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html)
- [x] [Get Started - Installing Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [x] [JDK 8 and JRE 8 Installation Start Here](https://docs.oracle.com/javase/8/docs/technotes/guides/install/install_overview.html)
- [x] [Install nvm](https://github.com/creationix/nvm#install-script) and [use node v6.10+](https://github.com/creationix/nvm#usage)
- [ ] Install DEEP CLI, also known as `deepify`:

```bash
npm install deepify -g
```

> If you want to use `deepify` on Windows, please follow the steps from
[Windows Configuration](https://github.com/MitocGroup/deep-framework/blob/master/docs/windows.md)
before running `npm install deepify -g` and make sure all `npm` and `deepify` commands are executed
inside Git Bash.

### Step 2. Install Microservice(s) Locally

```bash
deepify install github://MitocGroup/deep-microservices-dynamic-image ~/deep-microservices-dynamic-image
```

> Path parameter in all `deepify` commands is optional and if not specified, assumes current
working directory. Therefore you can skip `~/deep-microservices-dynamic-image` by executing
`mkdir ~/deep-microservices-dynamic-image && cd ~/deep-microservices-dynamic-image` before `deepify install`.

### Step 3. Run Microservice(s) in Development

```bash
deepify server ~/deep-microservices-dynamic-image -o
```

> When this step is finished, you can open in your browser the link *http://localhost:8000*
and enjoy the deep-microservices-dynamic-image running locally.

### Step 4. Deploy Microservice(s) to Production

```bash
deepify deploy ~/deep-microservices-dynamic-image
```

> Amazon CloudFront distribution takes up to 20 minutes to provision, therefore don’t worry
if it returns an HTTP error in the first couple of minutes.

### Step 5. Remove Microservice(s) from Production

```bash
deepify undeploy ~/deep-microservices-dynamic-image
```

> Amazon CloudFront distribution takes up to 20 minutes to unprovision. That's why `deepify`
command checks every 30 seconds if it's disabled and when successful, removes it from your account.


## Developer Resources

Having questions related to deep-microservices-dynamic-image?

- Ask questions: https://stackoverflow.com/questions/tagged/deep-framework
- Chat with us: https://mitocgroup.slack.com/messages/general
- Send an email: feedback@mitocgroup.com

Interested in contributing to deep-microservices-dynamic-image?

- Contributing: https://github.com/MitocGroup/deep-microservices-dynamic-image/blob/master/CONTRIBUTING.md
- Issue tracker: https://github.com/MitocGroup/deep-microservices-dynamic-image/issues
- Releases: https://github.com/MitocGroup/deep-microservices-dynamic-image/releases
- Roadmap: https://github.com/MitocGroup/deep-microservices-dynamic-image/blob/master/ROADMAP.md

Looking for web applications that use (or are similar to) deep-microservices-dynamic-image?

- Hello World: https://hello.deep.mg | https://github.com/MitocGroup/deep-microservices-helloworld
- Todo App: https://todo.deep.mg | https://github.com/MitocGroup/deep-microservices-todomvc
- AdTechMedia: https://www.adtechmedia.io | https://github.com/AdTechMedia/adtechmedia-website


## Sponsors

This repository is being sponsored by:
- [Mitoc Group](https://www.mitocgroup.com)
- [AdTechMedia](https://www.adtechmedia.io)

This code can be used under MIT license:
> See [LICENSE](https://github.com/MitocGroup/deep-microservices-dynamic-image/blob/master/LICENSE) for more details.
