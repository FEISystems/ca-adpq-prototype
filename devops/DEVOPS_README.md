# ca-adpq-prototype/devops
# author:  Ryan Chadwick
# company: FEi Systems Inc.

This readme will serve as an outline to Plays 9 and 10
in the Digital Services Playbook located at below.

https://playbook.cio.gov/#play9

https://playbook.cio.gov/#play10

Play 9 - Deploy in a flexible hosting environment

Our services should be deployed on flexible infrastructure,
where resources can be provisioned in real-time to meet spikes
in traffic and user demand. Our digital services are crippled
when we host them in data centers that market themselves as “cloud hosting”
but require us to manage and maintain hardware directly. This outdated
practice wastes time, weakens our disaster recovery plans, and results
in significantly higher costs.

Checklist for Play 9:

C 9.1   Resources are provisioned on demand.
C 9.2   Resources scale based on real-time user demand.
C 9.3   Resources are provisioned through an API.
C 9.4   Resources are available in multiple regions.
C 9.5   We only par for the resources we user.
C 9.6   Static assets are served through a content delivery network.
C 9.7   Application is hosted on commodity hardware.

Key Questions for Play 9:

K 9.1   Where is your service hosted?
K 9.2   What Hardware does your service use to run?
K 9.3   What is the demand or usage pattern for your services?
K 9.4   What happens to your services when it experiences a surves in traffic or load?
K 9.5   How much capacity is available in your hosting environment?
K 9.6   How long does it take you to provision a new resources, like an application server?
K 9.7   How have you designed your service to scale based on demand?
K 9.8   How are you planning for your hosting infrastructure (e.g., by the minute, hourly, daily, monthly, fixed)?
K 9.9   Is your service hosted in multiple regions, availability zones, or data centers?
K 9.10  In the event of a catastrophic disaster to a datacenter, how long till it take to have the service operational?
K 9.11  What would the impact of a prolonged downtime window?
K 9.12  What data redundancy do you have built into the system, and what would be the impact of a catastrophic data loss?
K 9.13  How often do you need to contact a person from your hosting provider to get resources or to fix an issue?

Play 10 - Automate testing and deployments

Today, developers write automated scripts that can verify thousands
of scenarios in minutes and then deploy updated code into production
environments multiple times a day. They use automated performance tests
which simulate surges in traffic to identify performance bottlenecks.
While manual tests and quality assurance are still necessary, automated
tests provide consistent and reliable protection against unintentional
regressions, and make it possible for developers to confidently release
frequent updates to the service.

Checklist for Play 10:

C 10.1  Create automated tests that verify all user-facing functionality.
C 10.2  Create unit and integration tests to verify modules and components.
C 10.3  Run tests automatically as part of the build process.
C 10.4  Perform deployments automatically with deployment scripts, continuous delivery services, or similar techniques.
C 10.5  Conduct load and performance tests at regular intervals, including before public launch.

Key Questions for Play 10:

K 10.1  What percentage of the code base is covered by automated tests?
K 10.2  How long does it take to build, test, and deploy a typical bug fix?
K 10.3  How long does it take to build, test, and deploy a new feature into production?
K 10.4  How frequently are builds created?
K 10.5  What test tools are used?
K 10.6  Which deployment automation or continuous integration tools are used?
K 10.7  What is the estimated mximum number of concurrent users who will want to use the system?
K 10.8  How many simultaneous users could the system handle, according to the most recent capacity test?
K 10.9  How does the service perform when you exceed the expected target usage volume?  Does it degrade gracefully or catastrophically?
K 10.10 What is your scaling strategy when demand increases suddenly?