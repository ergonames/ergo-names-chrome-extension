'use strict';

import './popup.css';

const ergonamesTestnetAPIBaseUrl = "https://testnet-api.ergonames.com";
const ergonamesMainnetAPIBaseUrl = "https://api.ergonames.com";

(function() {

  function resolve() {
    document.getElementById('button').addEventListener('click', async () => {
      let ergoname = document.getElementById('search').value;
      if (ergoname == "") {
        document.getElementById("address").innerHTML = "Please Search an ErgoName"
      } else {
        let address = await resolve_response(ergoname);
        if (address == null) {
          document.getElementById("address").innerHTML = "None";
        } else {
          document.getElementById("address").innerHTML = address;
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
    let url = ergonamesTestnetAPIBaseUrl + "/ergonames/resolve/" + ergoname;
    console.log(url);
    return url;
  }

  function copyAddressToClipboard() {
    document.getElementById('copy-address').addEventListener('click', async () => {
      let text = document.getElementById("address").innerHTML;
      navigator.clipboard.writeText(text);
    });
  }

  document.addEventListener('DOMContentLoaded', resolve);
  document.addEventListener('DOMContentLoaded', copyAddressToClipboard);
})();
