var http = require('http');
var querystring = require('querystring');


http.createServer(function(req, res) {
	var params = querystring.parse(req.url);
	if(params['/?echo']) {
		res.end(params['/?echo']);
	}
	if(params['/?echo64']) {
		var b = new Buffer(params['/?echo64'], 'base64');
		res.end(b.toString());
	}
	if(params['/?json']) {
		var json = JSON.stringify(o);
		res.end(json);
	}
}).listen(process.env.PORT || 1337);

var o = {
  "handler": "Microsoft.Compute.MultiVm",
  "version": "0.0.1-preview",
  "parameters": {
    "basics": [
      {
        "name": "vmSize",
        "type": "Microsoft.Common.DropDown",
        "label": "Topology Size",
        "defaultValue": "Small (A1 + A1)",
        "toolTip": "The size of the virtual machines to use in the cluster.",
        "constraints": {
          "allowedValues": [
            {
              "label": "Small (A1 + A1)",
              "value": "Small"
            },
            {
              "label": "Medium (A2 + D1)",
              "value": "Medium"
            },
            {
              "label": "Large (A3 + D2)",
              "value": "Large"
            }
          ]
        }
      },
      {
        "name": "dnsNameForPublicIP",
        "type": "Microsoft.Common.TextBox",
        "label": "DNS prefix",
        "toolTip": "This prefix will determine the public DNS name for the deployment.",
        "constraints": {
          "required": true
        }
      }
    ],
    "steps": [
      {
        "name": "deploymentDetails",
        "label": "Deployment Parameters",
        "subLabel": {
          "preValidation": "Required",
          "postValidation": "Done"
        },
        "bladeTitle": "Deployment Parameters",
        "elements": [
          {
            "name": "newStorageAccountName",
            "type": "Microsoft.Storage.StorageAccountSelector",
            "label": "Storage account",
            "toolTip": "Storage account where the VM disks will be stored.",
            "constraints": {
              "required": true
            }
          },
          {
            "name": "adminUsername",
            "type": "Microsoft.Compute.UserNameTextBox",
            "label": "VM username",
            "toolTip": "Administrative username for the virtual machines.",
            "osPlatform": "Linux",
            "constraints": {
              "required": true
            }
          },
          {
            "name": "adminPassword",
            "type": "Microsoft.Common.PasswordBox",
            "label": {
              "password": "VM password",
              "confirmPassword": "Confirm VM password"
            },
            "toolTip": "Administrative password for the virtual machines.",
            "constraints": {
              "required": true,
              "regex": "^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\\d\\W])|(?=.*\\W)(?=.*\\d))|(?=.*\\W)(?=.*[A-Z])(?=.*\\d)).{6,72}$",
              "validationMessage": "The password must be between 6 and 72 characters long, and contain characters from at least 3 of the following groups: uppercase characters, lowercase characters, numbers, and special characters."
            },
            "options": {
              "hideConfirmation": false
            }
          },
          {
            "name": "mySQLPassword",
            "type": "Microsoft.Common.PasswordBox",
            "label": {
              "password": "MySQL password",
              "confirmPassword": "Confirm MySQL password"
            },
            "toolTip": "The password for the MySQL administrator account.",
            "constraints": {
              "required": true,
              "regex": "",
              "validationMessage": ""
            },
            "options": {
              "hideConfirmation": false
            }
          }
        ]
      },
      {
        "name": "SiebelInfo",
        "label": "Siebel Parameters",
        "subLabel": {
          "preValidation": "Required",
          "postValidation": "Done"
        },
        "bladeTitle": "Siebel Parameters",
        "elements": [
          {
            "name": "adminFirstName",
            "type": "Microsoft.Common.TextBox",
            "label": "First name",
            "defaultValue": "",
            "toolTip": "Siebel administrator first name.",
            "constraints": {
              "required": true
            }
          },
          {
            "name": "adminLastName",
            "type": "Microsoft.Common.TextBox",
            "label": "Last name",
            "defaultValue": "",
            "toolTip": "Siebel administrator last name",
            "constraints": {
              "required": true
            }
          },
          {
            "name": "adminEmail",
            "type": "Microsoft.Common.TextBox",
            "label": "E-mail",
            "defaultValue": "",
            "toolTip": "Siebel administrator e-mail",
            "constraints": {
              "required": true,
              "regex": ""
            }
          },
          {
            "name": "adminPSPassword",
            "type": "Microsoft.Common.PasswordBox",
            "label": {
              "password": "Password",
              "confirmPassword": "Confirm password"
            },
            "toolTip": "Siebel administrator password",
            "constraints": {
              "required": true,
              "regex": "",
              "validationMessage": ""
            },
            "options": {
              "hideConfirmation": false
            }
          }
        ]
      }
    ],
    "outputs": {
      "vmSize": "[basics('vmSize')]",
      "dnsNameForPublicIP": "[basics('dnsNameForPublicIP')]",
      "adminUsername": "[steps('deploymentDetails').adminUsername]",
      "adminPassword": "[steps('deploymentDetails').adminPassword]",
      "mySQLPassword": "[steps('deploymentDetails').mySQLPassword]",
      "newStorageAccountName": "[steps('deploymentDetails').newStorageAccountName.name]",
      "adminFirstName": "[steps('SiebelInfo').adminFirstName]",
      "adminLastName": "[steps('SiebelInfo').adminLastName]",
      "adminEmail": "[steps('SiebelInfo').adminEmail]",
      "adminPSPassword": "[steps('SiebelInfo').adminPSPassword]",
      "region": "[location()]"
    }
  }
}
