# Waframe Drop Finder
WFDF is an open-source web app to find all information about Warframe Items in one place. WFDF also provides an API for other applications to take advantage of as well. For more information about specific parts of the project see the respective READMEs in each folder.

<br />

# Run this app
To run this app locally you can use docker-compose. 
- Clone the repository: (`git clone https://github.com/jtbry/WarframeDropFinder`)
- Run the `build.sh` script in the root directory (`./build.sh`)
- Run `docker-compose up`. After that (`docker-compose up`)

To run this app locally without docker (i.e for development) you can use the language appropriate commands
- `cd ./src/Wfdf.Api && dotnet run` for the REST API
- `cd ./src/client && npm run start` for the React app
- `cd ./src/Wfdf.DataFetcher && dotnet run` for the DataFetcher. You *must* use docker, or an ofelia binary on your local machine, to run the datafetcher on a schedule. Also, you may use the `--force` flag when running the datafetcher to force an update regardless of commit sha.
- Make sure you have an accessible MongoDB instance running and have the ConnectionString set in the Api and DataFetcher

Deploying this app to a production environment will not be covered here, the deployment scripts will only work if your local machine has all the appropriate tools already installed and configured.
<br />

# Credits
- [NexusHub](https://github.com/nexus-devs/NexusHub) for inspiration.
- [WFCD Warframe Items](https://github.com/WFCD/warframe-items) for warframe items list.
- [WFCD Patchlogs](https://github.com/WFCD/warframe-patchlogs) for inspiration.
- [Warframe Market](https://warframe.market/) for item platinum prices.
- [Digital Extremes / Warframe](https://www.warframe.com/landing) for all warframe assets.

<br />

# License
Warframe Drop Finder is [Licensed](/LICENSE) with the [MIT License](https://spdx.org/licenses/MIT.html)