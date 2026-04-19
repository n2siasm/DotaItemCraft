# Dota Item Craft (v0.1)
Web application mini-game for crafting items relevant to DotA 2 7.41b

## Site
Frontend
> Work in progres... The React project is running on *http://localhost:5173/*

Backend
> When running a **backend** project, a random item and the GUIDs of its components are returned at *http://localhost:5000/Craft/random-compound*, list of all items returned at *http://localhost:5000/Craft/all-items*, the item's compliance check is sent to *http://localhost:5000/Craft/check*

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
> The tool automatically populated the database with image names, matching the name of the item from the database with the name of the image from the **public** folder. Since the names of some critical items do not match their official counterparts, the rest of the database has been manually corrected.

## Known Bugs
- Double-pressing Enter counts the item
- Lack of recipes (and a general recipe)





