'use strict';

import './popup.css';
var pjson = require('../package.json');

let NETWORK_TYPE = "TESTNET";

const ergonamesTestnetAPIBaseUrl = "https://testnet-api.ergonames.com";
const ergonamesMainnetAPIBaseUrl = "https://api.ergonames.com";

(function() {

  function resolve() {
    document.getElementById('button').addEventListener('click', async () => {
      let ergoname = document.getElementById('search').value;
      if (ergoname == "") {
        document.getElementById("copy-address").innerHTML = "Please Search an ErgoName"
      } else {
        let address = await resolve_response(ergoname);
        if (address == null) {
          document.getElementById("copy-address").innerHTML = "Ergo Name Not Registered";
        } else {
          document.getElementById("copy-address").innerHTML = address;
        }
      }
    });
  }

  async function resolve_response(ergoname) {
    let response = await lookup_owner_address(ergoname);
    let address = response['ergo'];
    console.log(address);
    return address;
  }

  async function lookup_owner_address(ergoname) {
    let url = create_url(ergoname);
    return await fetch(url)
      .then(res => res.json())
      .then(data => {
        return data;
      })
  }

  function create_url(ergoname) {
    let url = "";
    if (NETWORK_TYPE == "MAINNET") {
      url = ergonamesMainnetAPIBaseUrl + "/ergonames/resolve/" + ergoname;
    } else if (NETWORK_TYPE == "TESTNET") {
      url = ergonamesTestnetAPIBaseUrl + "/ergonames/resolve/" + ergoname;
    }
    console.log(url);
    return url;
  }

  function copyAddressToClipboard() {
    document.getElementById('copy-address').addEventListener('click', async () => {
      let text = document.getElementById("copy-address").innerText;
      navigator.clipboard.writeText(text);
    });
  }

  function toolbarHandler() {
    document.getElementById('home-button').addEventListener('click', () => {
      let homePage = document.getElementById('home-page');
      let settingsPage = document.getElementById('settings-page');
      homePage.style.display = "block";
      settingsPage.style.display = "none";
    });
    document.getElementById('settings-button').addEventListener('click', () => {
      document.getElementById('extension-version').innerHTML = pjson.version;
      document.getElementById('network-type').innerHTML = NETWORK_TYPE;
      let homePage = document.getElementById('home-page');
      let settingsPage = document.getElementById('settings-page');
      homePage.style.display = "none";
      settingsPage.style.display = "block";
    });
  }

  document.addEventListener('DOMContentLoaded', resolve);
  document.addEventListener('DOMContentLoaded', toolbarHandler);
  document.addEventListener('DOMContentLoaded', copyAddressToClipboard);
})();
