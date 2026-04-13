# Dota Item Craft (v0.0.1)
Web application mini-game for crafting items relevant to DotA 2 7.41b

## Site
Frontend
> Work in progres...

Backend
> When running a **backend** project, a random item and the GUIDs of its components are returned at *http://localhost:5000/Craft/random-compound*

## Database (SQLite)
![Database screenshot](https://i.postimg.cc/0jZd3gLY/2026-04-13-225015.png)
items
> Contains a list of all items and some of their attributes such as name, cost and associated image (string file name). 
> Columns: guid (key), name, cost, img

itemComponents
> Contains a list of items and their components, expressed as GUIDs. 
> Columns: guid (key), parentGuid, componentGuid

itemAttributes
> Work in progress... 
> Columns: guid (key), itemGuid, type, name, manacost, cooldown, range

itemAbilities
> Work in progres... 
> Columns: guid (key), itemGuid, name, value

## Utilities
Image Fuzzy Update
> The tool automatically populated the database with image names, matching the name of the item from the database with the name of the image from the **Images** folder.
> !WARNING: Database populating errors have already been detected due to the inadequacy of the Fuzzy Search algorithm.





