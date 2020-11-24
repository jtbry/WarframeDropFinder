# Waframe Drop Finder
WFDF is an open-source web app to find all information about Warframe Items in one place. WFDF also provides an API for other applications to take advantage of as well. For more information about specific parts of the project see the respective READMEs in each folder.

<br />

# Getting started / Deployment
You will need docker installed to easily run this application, it can be ran without docker but that process will not be explained here. Do note, if you are trying to run these services in a development environment without Docker you will need to change the React App's proxy in `package.json`. Using Docker will allow you to start all of WFDF's services in a single command. Docker will create a seperate container for all of the app's services.

<br />

You can start all services at once by executing `docker-compose up -d`. To start the project in a development friendly environment execute `docker-compose -f docker-compose.dev.yml up --build -d`. 

To watch the output of the service you're developing you can use the `docker-compose logs -f service_name_here` command.

<br />

# Credits
- [NexusHub](https://github.com/nexus-devs/NexusHub) for inspiration.
- [WFCD Warframe Items](https://github.com/WFCD/warframe-items) for warframe items list.
- [WFCD Patchlogs](https://github.com/WFCD/warframe-patchlogs) for inspiration.
- [Warframe Market](https://warframe.market/) for real time item platinum prices. (WIP)
- [Digital Extremes / Warframe](https://www.warframe.com/landing) for all warframe assets.

<br />

# License
Warframe Drop Finder is [Licensed](/LICENSE) with the [MIT License](https://spdx.org/licenses/MIT.html)