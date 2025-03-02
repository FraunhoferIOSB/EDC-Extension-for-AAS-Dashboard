import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';
import { CONNECTOR_DEFAULT_API } from '../../variables';


@Component({
  selector: 'MyAAS',
  templateUrl: './own-self-description-browser.component.html',
  styleUrls: ['./own-self-description-browser.component.scss']
})
export class OwnSelfDescriptionBrowserComponent implements OnInit {

  selfDescriptionContainer?: SelfDescriptionContainer;
  notFound: boolean = false;
  provider: URL;
  private selfDescriptionService: SelfDescriptionBrowserService;

  constructor(httpClient: HttpClient, @Inject(CONNECTOR_DEFAULT_API) provider: URL,
    private router: Router) {
    this.provider = new URL(provider.toString().concat("/selfDescription"));
    this.selfDescriptionService = new SelfDescriptionBrowserService(httpClient);
  }

  ngOnInit() {
    this.updateSelfDescriptionContainer();
  }

  async editContract(element: IdsAssetElement) {
    // TODO see asset-editor-dialog
    alert("Navigating to contract page for asset " + element.id + "... ");
    this.reroute("/contract-definitions");
  }

  async updateSelfDescriptionContainer() {
    this.selfDescriptionService.readSelfDescriptions(this.provider);
    var allSelfDescriptions = this.selfDescriptionService.getAllSelfDescriptions();
    this.selfDescriptionContainer = allSelfDescriptions.values().next().value;
  }

  async reroute(site: string) {
    this.router.navigateByUrl(site);
    // TODO how do you pass element info to other sites?
  }
}
