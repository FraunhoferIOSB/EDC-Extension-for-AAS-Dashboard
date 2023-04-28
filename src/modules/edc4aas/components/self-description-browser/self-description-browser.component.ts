import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';

@Component({
  selector: 'Other AAS',
  templateUrl: './self-description-browser.component.html',
  styleUrls: ['./self-description-browser.component.scss']
})
export class SelfDescriptionBrowserComponent implements OnInit {

  selfDescriptionContainers$: Set<SelfDescriptionContainer>;
  fetch$ = new BehaviorSubject(null);
  searchText = 'http://localhost:8181/api/selfDescription';

  log: string = "";
  newestLog: string = "";

  constructor(private selfDescriptionService: SelfDescriptionBrowserService,
    protected httpClient: HttpClient,
    private router: Router) {
    this.selfDescriptionContainers$ = selfDescriptionService.getAllSelfDescriptions();
  }

  ngOnInit(): void { }

  async onSearch() {
    var sanitized = this.searchText.replace(" ", "%20");
    if (await this.checkLink(`${sanitized}`)) {
      this.selfDescriptionService.readSelfDescriptions(new URL(sanitized));
    } else this.addLogMessage("URL not responding: " + sanitized);
  }

  async onDelete(selfDescriptionContainer: SelfDescriptionContainer) {
    this.selfDescriptionService.removeSelfDescriptionContainer(selfDescriptionContainer);
  }

  async negotiateContract(element: IdsAssetElement, provider: URL) {
    // TODO see asset-negotiator-dialog
    console.log(element, provider);
    //alert("negotiate asset " + element.idsAssetId + " from " + provider.toString());
    this.router.navigate(["/client", element.idsAssetId, provider.toString()]);
  }

  reroute(site: string) {
    this.router.navigateByUrl(site);
    // TODO how do i pass element info to other sites?
  }

  async addLogMessage(message: String) {
    var newLog = this.newestLog + "\n" + this.log;
    this.log = newLog;
    this.newestLog = new Date().toLocaleString() + ": " + message;
  }

  async clearLog() {
    this.newestLog = "";
    this.log = "";
  }

  checkLink = async (url: string) => (await fetch(url)).ok;

}

