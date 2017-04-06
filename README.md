# Project Dominion
---

## Introduction
  In a nutshell, Project Dominion (the lack of a suitable acronym for the actual purpose means this name is likely to be temporary and is only used as the prototype name) is a property mapping/information system with analytical capabilities. 
  Project Dominion draws inspiration from most modern geographic information systems, with the main difference being that GIS caters to a broad category of geographic and geo/spatial purposes, which means the said systems are often feature-heavy and general-purpose, while Dominion aims to focus on the features PRIME would benefit the most, which will be expounded below. While specific types of GIS might exist, operating and using one usually requires deep knowledge in geoinformatics or other related fields.

  Dominion seeks to complement Sales Information System by means of providing geographical and spatial context, which opens the SIS data to further possibilities, such as spatial processing. There is no overlap: the SIS aims to organize and consolidate general information of the company listings, projects, contacts and inquiries and to make it easy to do so, while Dominion serves as an alternative geospatial view in contrast with the descriptive general view of SIS, and provides additional features. 


  Following are the features considered for Dominion:
    •	View all listings and projects in map – as layer
      o	Plot (polygon) support for individual lots, CMID properties, projects
      o	Same point-based support for rental units
      o	Display data from SIS (project/listing name)
      o	Filters and advanced search
    •	Option to add supplementary layers – editable by users with update privilege, viewable by others
      o	Key developments
      o	Landmarks
      o	Infrastructure
    •	Scouting features – can be part of layer functionality (NOT INCLUDED IN MVP - MARKED FOR NEXT PHASE)
      o	Mark points on map for potential listings (as layer)
      o	Map out planned routes
      o	Record actual scouting route

## Implementation Details
### Tiling Provider
  The mapping system can function with a third-party map tiling provider with the benefit of ease-of-use with regards to development and maintenance, but this means that offline functionality of Dominion within office network/premises cannot be attained, as well as data security and the option to customize how the map is tiled and displayed. This also ensures that, even at high access rates, there will be no need to purchase enterprise map tiling plans.
  A self-hosted map tiling provider, on the other hand, comes with the expense of maintenance and infrastructure expenses. The OpenStreetMap documentation recommends at least 24GB of RAM, 500GB of fast storage (SSD) and a quad-core processor for a dedicated tiling server with 100% world map coverage. This does not even factor in a backup-enabled, distributed / load balancing setup and the maintenance personnel such a setup will likely require.
  A previous recommendation was to use Google Earth Enterprise since it was made open-source earlier. But only Server and Fusion were open-sourced, the Client and Maps Javascript API were not, and it is in this interest that the OSM stack is now suggested:

  -	A postgres database with PostGIS for geospatial data features, which is the backend
  -	The OSM data extracts, which are essentially map data imported by osm2pgsql
  -	The mapnik library for rendering geodata to tiled images
  -	The renderd binary for priority queueing rendering requests
  -	The mod_tile apache module for serving cached tiles and handling tile cache invalidation
  -	An apache webserver for hosting the tiled images
  -	The osmium library for automating map data updates

  On a related note, the OSM data has been found to be not as thorough as Google Maps data, but that is a minor concern. OpenStreetMaps accepts user contributions, so a suitable workflow for resolving this will probably involve editing and submitting an update to the map, which, upon acceptance, will make its way to our server via the automated map updates.
  This proposal recommends the use of a self-hosted tile server. A third-party provider might suffice for the first few months/years, but when the free limits are hit eventually a self-hosted map server will outweigh its costs.
  Reference: https://switch2osm.org/why-switch/ and https://switch2osm.org/serving-tiles/building-a-tile-server-from-packages/ 

### Server Infrastructure
  The above references also mention the minimum required specifications for the server.
  The first section will outline pros and cons of a bare metal / on premise server over a cloud server. The next will indicate our current server setup, as well as the costs of a minimum upgrade and an optimal upgrade. The next sections will outline potential costs of going for a cloud server.

  #### On-premise vs. Cloud
  On-premise in this sense means that the server is locally accessible, as opposed to a remote facility in the case of a cloud server.
  Cloud providers come with the benefit of less than half the maintenance effort required in on-premise servers, not to mention that it is the provider’s problem that the server hardware be replaced every five years (an industry practice). Cloud providers with multiple data centers also provide CDNs that speed up global connections to the server. The pressing concerns against cloud providers, however, include data security and privacy.
  On-premise servers come with the front-up costs of building and maintaining your own server architecture, and is probably the greatest hindrance. The five-year server rule makes it harder to invest long-term in an on-prem server, but with personnel adequately knowledgeable in development operations, and proper stepped upgrades the cost is the least of the concerns when going on-premises with infrastructure. The other concerns are electrical costs, that the security is dependent on the DevOps personnel and that the on-premise server relies heavily on the accompanied Internet connection if it is to be accessed online.
  References: http://www.informationweek.com/cloud/cloud-vs-on-premises-6-benefits-of-keeping-data-private/d/d-id/1323089 and https://betanews.com/2013/11/04/comparing-cloud-vs-on-premise-six-hidden-costs-people-always-forget-about/
  https://arstechnica.com/civis/viewtopic.php?t=1229125

  #### Current Specifications and Responsibilities
  Current general-purpose server (prime-heimdallr @ 192.168.1.16)
  -	Operating System: Ubuntu 16.04
  -	Processor: AMD A4-6300 APU with Radeon HD Graphics 64-bit
    -	Dual-core @ 3.7 Ghz
    -	Radeon HD Graphics means that there is no dedicated video card, it is unsuitable for heavy graphic processing
  -	4GB RAM, 3193 MB usable for volatile memory
    -	The difference (800MB~) is being used by Radeon HD Graphics.
  -	500GB SATA Hard disk drive for data storage
    -	Speed currently untested.
  -	No RAID setup (physical disk failure countermeasure), no UPS (power surge/loss countermeasure)
  -	Current server responsibilities
    -	Hosts the Athena (database, API and authentication) and Hermes (user interface, data pre-processing) modules of SIS
  -	Also hosts the is-push-server, the real-time notifications server
    -	The Node process manager (pm2) hosts two applications:
  -	hermes-release-server: the SIS application update server
  -	Mnemosyne v1: company knowledgebase (pending migration as of this writing)
    -	The Java container servlet (Tomcat) hosts Mnemosyne v2, the updated company knowledgebase.
    -	Maintains the webserver (apache2), language utilities (HHVM, php-fpm), database (mysqld, postgres) and cache (redis, memcached) systems used by various applications and other systems

  Minimum upgrade recommendation: (recommended for single-country rendering and to improve general purpose task handling)
    -	A quad-core processor
    -	Additional 4GB RAM
    -	500GB SSD (faster storage)
    -	UPS to protect against power interruptions
  Optimal upgrade recommendation: (recommended for whole world map rendering, as well as machine learning)
    -	An octa-core processor
    -	RAM >= 16 GB (2x8GB)
    -	1TB SSD
    -	Dedicated video card, 1GB
    -	UPS to protect against power interruptions
    -	RAID setup (2x1TB) optionally for disk redundancy

  Another possibility is to create a distributed sector of servers, but that is beyond the scope of this document, and is probably a bit overkill for the tasks currently undertaken. However, it should be noted that once machine learning has been integrated with the current systems it is imperative that the servers be distributed eventually, to prevent overloading.

### Backend (Persistence and Authentication)
  The map server currently uses a Postgresql/PostGIS-enabled database to hold the map data.
  It is recommended that Dominion make use of Athena, the secured database abstraction layer/API built with Laravel on top of the MySQL database. This will enable Dominion to make use of the same tables SIS uses: The login credentials for Dominion and SIS will be the same, and it will be trivial for both systems to access each other’s data.
  Now this brings database access load into the equation. However, as the answers in this link state, (http://stackoverflow.com/questions/14901508/maximum-concurrent-connections-to-mysql) 10,000 concurrent connections are the normal limit of MySQL databases. Unless there are 10,000+ users at the same time doing operations on the database this means the load will not be a concern.
  It must be noted though that the security attack vector of having another layer access Athena means it is imperative both SIS and Dominion be further secured, where possible.
