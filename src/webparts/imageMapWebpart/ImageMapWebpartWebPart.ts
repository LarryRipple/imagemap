import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField, PropertyPaneButtonType,PropertyPaneLabel,
PropertyPaneDropdown,

	PropertyPaneButton,
} from '@microsoft/sp-property-pane';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

require("uikit/dist/js/uikit.min.js") ;
require("uikit/dist/css/uikit.css")

import * as $ from "jquery";
import * as jQuery from "jquery";
window["jQuery"] = window["$"] = $;

import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";


import { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } from '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor';
import * as strings from 'ImageMapWebpartWebPartStrings';


export interface IImageMapWebpartWebPartProps {
  description: string;
  filePickerResult: IFilePickerResult;
  htmlCode: string;
    mytextbox:string;
    mode:string;
}

export default class ImageMapWebpartWebPart extends BaseClientSideWebPart<IImageMapWebpartWebPartProps> {

  public render(): void {

    var instanceid = this.context.instanceId;
		var instance = instanceid.split("-")[0];

    var file;
    if(this.properties.filePickerResult!=undefined){file = this.properties.filePickerResult.fileAbsoluteUrl} else {file=""}
    let selectedimage;
    if(this.properties.filePickerResult){selectedimage = this.properties.filePickerResult.fileAbsoluteUrl} else {selectedimage = ""}

        this.domElement.innerHTML = `



    <div id="image`+instance+`"  style="width:100%; margin:auto">

    </div>

    <div id="render`+instance+`" style="width:100%; margin:auto">`+this.properties.htmlCode+`</div>
         `;
         var left = "auto";
         let top = "auto";
         let width: number = this.domElement.getBoundingClientRect().width;

         if(this.displayMode==2){




        } else if(this.displayMode==1){ width=width+16}
         if(this.displayMode==2){
           var renderid="#render"+instance;
           var imageid="#image"+instance;
           var imageref="#image"+instance +" img";
           width=width+16
           $(renderid).hide()} else if(this.displayMode==1){$(imageid).hide()}
         if(this.properties.htmlCode==undefined||this.properties.htmlCode==""){$(imageid).append(  `<img class="mapimage" style="width:`+width+`px !important; max-width:`+width+`px !important;position:relative;" src="`+file+`" id="target" alt="[Text Over Example]" />`)} else{$(imageid).html(this.properties.htmlCode) }
        $(imageref).click(function(e) {
          if($("#spPropertyPaneContainer > div").length ==1){
          var offset = $(this).offset();

          var left = e.pageX - offset.left;
          var top = e.pageY - offset.top




          let text;

          let title = prompt("Text", "Image Map");
          let person = prompt("Url", "#");
          var open;
          if(person.indexOf(window.location.protocol + "//" + window.location.host) > -1){

            open = "_self";

          } else {

            open = "_blank";

          }
          if (person == null || person == "") {
            text = "User cancelled the prompt.";
          } else {
            if(isImgLink(person)){
              if($("#spPropertyPaneContainer > div").length ==1){
            $(imageid).append(`<div uk-lightbox>
          <a uk-tooltip="`+title+`" class="uk-position-absolute uk-transform-center" data-caption="`+title+`" style="left: `+left+`px; top:`+top+`px" data-interception="off" target=`+open+` href="`+person+`" uk-marker></a>
          </div>`)}} else {if($("#spPropertyPaneContainer > div").length ==1){
            $(imageid).append(` <a uk-tooltip="`+title+`" class="uk-position-absolute uk-transform-center" style="left: `+left+`px; top:`+top+`px" data-interception="off" target=`+open+` href="`+person+`" uk-marker></a>
            `) }}
          console.log($("#spPropertyPaneContainer > div").length)
            $('div[data-automation-id="propertyPaneGroupField"] > button').click()
          }

        }});
        var imagemarker = imageid  +" .uk-marker"
        $(imagemarker).on('click', function(event){
          if(this.displayMode==2){
          event.stopPropagation();
          event.stopImmediatePropagation();

          }
        });
        function isImgLink(url) {
          if(typeof url !== 'string') return false;
          return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null);
      }
        $(imagemarker).on('dblclick', function(event){
          if($("#spPropertyPaneContainer > div").length ==1){
          event.stopPropagation();
          event.stopImmediatePropagation();
          let title = prompt("Title", $(this).attr("uk-tooltip"));
          let person = prompt("Url", $(this).attr("src"));
          $(this).attr("uk-tooltip",title)
          $(this).attr("src",person)
          $('div[data-automation-id="propertyPaneGroupField"] > button').click()
        }});

        $("a.uk-marker").contextmenu(function (e) { e.preventDefault(); }, false);
        $(imagemarker).mousedown(function(event) {
          event.preventDefault();
          if($("#spPropertyPaneContainer > div").length ==1){
          switch (event.which) {

              case 3:
                 $(this).remove()
                  break;

          }
          $('div[data-automation-id="propertyPaneGroupField"] > button').click()
        }});
var offset;
$("#offset").remove()
if(this.domElement.getBoundingClientRect().width==1204 && this,this.displayMode==1){$("body").append(`<style id="offset">      .mapimage{left:-15px;top:-30px;}</style>`)}
if(this.domElement.getBoundingClientRect().width>1204 && this,this.displayMode==1){$("body").append(`<style id="offset">   </style>`)


}
console.log(width);


    $("body").append(`<style>

    .loginPopup {
      position: relative;
      text-align: center;
      width: 100%;
    }
    .formPopup {
      display: none;
      position: fixed;
      left: 45%;
      top: 5%;
      transform: translate(-50%, 5%);
      border: 3px solid #999999;
      z-index: 9;
    }
    .formContainer {
      max-width: 300px;
      padding: 20px;
      background-color: #fff;
    }
    .formContainer input[type=text],
    .formContainer input[type=password] {
      width: 100%;
      padding: 15px;
      margin: 5px 0 20px 0;
      border: none;
      background: #eee;
    }
    .formContainer input[type=text]:focus,
    .formContainer input[type=password]:focus {
      background-color: #ddd;
      outline: none;
    }
    .formContainer .btn {
      padding: 12px 20px;
      border: none;
      background-color: #8ebf42;
      color: #fff;
      cursor: pointer;
      width: 100%;
      margin-bottom: 15px;
      opacity: 0.8;
    }
    .formContainer .cancel {
      background-color: #cc0000;
    }
    .formContainer .btn:hover,
    .openButton:hover {
      opacity: 1;
    }
    .uk-marker {
      padding: 5px;
      background: #031795;
      color: #fff;
      border-radius: 500px;
  }

  .uk-marker:hover {
      background: #f6f8fb;
      color: #031795
  }
#workbenchPageContent{max-width:1204px}
    </style>`)
    function openForm() {

    }
    function closeForm() {
      $("#popupForm").hide()
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      let modal = document.getElementById('loginPopup');
      if (event.target == modal) {
        closeForm();
      }
    }

    }
    private instructions(): any {
      var instanceid = this.context.instanceId;
      var instance = instanceid.split("-")[0];
      var imageid = "#image"+instance
      this.properties.htmlCode = $(imageid).html();





    }

      protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
          pages: [
            {
              header: {
                description: strings.PropertyPaneDescription
              },
              groups: [
                {
                  groupName: strings.BasicGroupName,
                  groupFields: [
                    PropertyPaneTextField('description', {
                      label: strings.DescriptionFieldLabel
                    }),
                    PropertyFieldFilePicker('filePicker', {
                        context: this.context,
                        filePickerResult: this.properties.filePickerResult,
                        onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                        properties: this.properties,
                        onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e;  },
                        onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; this.instructions},
                        key: "filePickerId",
                        buttonLabel: "File Picker",
                        label: "File Picker",

                    }),
                    PropertyPaneButton("templateload", {
                      text: "Save",
                      buttonType: PropertyPaneButtonType.Hero,
                      icon: "Save",
                      onClick: this.instructions.bind(this),
                      disabled: false,

                    }),

                    PropertyFieldCodeEditor('htmlCode', {
                      label: 'Edit HTML Code',
                      panelTitle: 'Edit HTML Code',
                      initialValue: this.properties.htmlCode,
                      onPropertyChange: this.onPropertyPaneFieldChanged,
                      properties: this.properties,
                      disabled: true,
                      key: 'codeEditorFieldId',
                      language: PropertyFieldCodeEditorLanguages.HTML,
                      options: {
                        wrap: true,
                        fontSize: 20,
                        // more options
                      }
                    })
                  ]
                }
              ]
            }
          ]
        };
      }
    }
    function removeEmpty() {
      throw new Error('Function not implemented.');
    }


