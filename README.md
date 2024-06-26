# Obsidian Bearable Data Import Plugin

Import data from a Bearable (https://bearable.app) CSV Export and add it to your daily note.

I created this for myself in a day, and am publishing it in case there are any other Bearable users who want to track their Bearable data within Obsidian. With that said, it's pretty opiniated.

**Note:** This plugin is in alpha. Use it at your own risk!

Since Bearable doesn't expose an API in the app to get data, and it only supports exporting CSV data of an entire month, there are some prerequisit steps to using this plugin.

- In the Bearable App 
  - Click the menu in the top right corner
  - Click the share icon in the top right corner
  - Click on Obsidian

- In Obsidian
  - Find the file that was just imported from Bearable
  - Configure the Plugin
    - The CSV file path
    - The format of your daily note file
    - The header where you want to write the data
    - Enable to toggles for the data points you want to impor
  - Cmd+P to open the Command Palette
    - Run Bearable Data Import

The plugin will then look through the CSV file for data from today in the format for YYYY-MM-DD, and write DataView values of everything under the heading you have defined in the settings. If it doesn't find the heading it will append it, and all of the data, to the end of the note.

Like I said, this is very much an alpha version, so use it at your own risk!

## PRs welcome!

## Buy me a Coffee?
If this plugin has helped you, or you want to support it's development:

```json
{
    "fundingUrl": "https://buymeacoffee.com/bcwilsondotcom"
}
```
