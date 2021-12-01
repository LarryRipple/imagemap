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



    var file;
    if(this.properties.filePickerResult!=undefined){file = this.properties.filePickerResult.fileAbsoluteUrl} else {file=""}
    let selectedimage;
    if(this.properties.filePickerResult){selectedimage = this.properties.filePickerResult.fileAbsoluteUrl} else {selectedimage = ""}

        this.domElement.innerHTML = `



    <div id="image">

    </div>

    <div id="render">`+this.properties.htmlCode+`</div>
         `;
         var left;
         var top;
        var width: number;

         if(this.displayMode==2){
          left="0px";top="-20px";width=this.domElement.getBoundingClientRect().width  } else{left="-20px";top="-20px";width=1140}
         if(this.properties.mode==undefined||this.properties.mode=="edit"){$("#render").hide()} else if(this.properties.mode=="view"){$("#image").hide()}
         if(this.properties.htmlCode==undefined||this.properties.htmlCode==""){$("#image").append(  `<img style="width:`+width+`px;position:relative;left:`+left+`;top:`+top+`" src="`+file+`" id="target" alt="[Text Over Example]" />`)} else{$("#image").html(this.properties.htmlCode) }
        $('#image img').click(function(e) {
          var offset = $(this).offset();

          var left = e.pageX - offset.left;
          var top = e.pageY - offset.top




          let text;
          let title = prompt("Text", "Image Map");
          let person = prompt("Url", "#");

          if (person == null || person == "") {
            text = "User cancelled the prompt.";
          } else {
            $("#image").append(`
          <a uk-tooltip="`+title+`" class="uk-position-absolute uk-transform-center" style="left: `+left+`px; top:`+top+`px" data-interception="off"  href="`+person+`" uk-marker></a>
          `)
          }

        });

        $("#image .uk-marker").on('dblclick', function(event){

          event.stopPropagation();
          event.stopImmediatePropagation();
          let title = prompt("Title", $(this).attr("uk-tooltip"));
          let person = prompt("Url", $(this).attr("src"));
          $(this).attr("uk-tooltip",title)
          $(this).attr("src",person)
        });

        $('#image .uk-marker').mousedown(function(event) {
          switch (event.which) {

              case 3:
                 $(this).remove()
                  break;

          }
      });
    $("body").append(`<style>
    .uk-marker:hover{background:red;color:black}
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
      this.properties.htmlCode = $("#image").html();





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
                    PropertyPaneDropdown('mode', {
                      label: "Select Mode",
                      options: [{key:'edit',text:'Edit Mode'},{key:'view',text:'View Mode'}],

                    }),
                    PropertyFieldCodeEditor('htmlCode', {
                      label: 'Edit HTML Code',
                      panelTitle: 'Edit HTML Code',
                      initialValue: this.properties.htmlCode,
                      onPropertyChange: this.onPropertyPaneFieldChanged,
                      properties: this.properties,
                      disabled: false,
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


