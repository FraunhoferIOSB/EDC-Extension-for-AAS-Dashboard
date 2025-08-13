import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'Automated Negotiation',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  providerUrl?: URL;
  assetId?: string;
  providerName?: String;

  data?: JSON;

  searching: boolean = false;
  customInput: boolean = false;
  showAccepted: boolean = false;
  showAcceptableProviderContracts: boolean = false;
  showData: boolean = false;

  accepted?: JSON;
  providerAcceptableForAsset?: JSON;
  newAccepted?: string;

  log: string = "";
  newestLog: string = "";

  constructor(private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.providerUrl = new URL("http://provider:8282/dsp");
      this.assetId = params['1'];
      this.providerName = "provider"
      this.addLogMessage("Initialized with URL " + this.providerUrl + ", asset " + this.assetId);
    });
  }

  async negotiateContractAndGetData() {

    if (this.providerUrl && this.assetId) {
      this.searching = true;
      console.log("HELLO WORLD")
      this.clientService
        .negotiateContractAndGetData(this.providerUrl, this.assetId, this.providerName).subscribe({
          next: result => this.data = result,
          error: (e) => {
            if (this.providerName) {
              this.addLogMessage("Negotiate: New output received. Please check the data tab.");
              console.log(e);
              this.data = e.error.text;
              this.showData = true;
            }
            else {
              console.error(e);
              this.addLogMessage("Negotiate: There was an error. Please check your EDC's output for details.");
            }
            this.searching = false;
          },
          complete: () => {
            console.info('complete');
            this.showData = true;
            this.searching = false;
            this.addLogMessage("Negotiation complete.");
          }
        });
    } else {
      this.addLogMessage("Negotiate: Provider URL and/or asset id missing")
    }
  }

  async fetchAcceptedContracts() {
    this.searching = true;

    this.clientService
      .fetchAcceptedContracts().subscribe({
        next: result => this.accepted = result,
        error: (e) => {
          console.error(e);
          this.addLogMessage("Show own accepted contracts: There was an error. Please check your EDC's output for details.");
          this.searching = false;
        },
        complete: () => {
          console.info('complete');
          this.showAccepted = true;
          this.searching = false;
          this.addLogMessage("Fetched this EDC's accepted contracts.");

        }
      });
  }

  async addAcceptedContract() {
    console.log(this.newAccepted);
    if (this.newAccepted) {
      this.clientService.addAcceptedContract(this.newAccepted).subscribe({
        next: _ => _,
        error: (e) => {
          console.error(e);
          this.addLogMessage("Add accepted contracts: There was an error. Please check your EDC's output for details.");
          this.searching = false;
        },
        complete: () => {
          console.info('complete');
          this.addLogMessage("Added accepted contract to EDC.");
          this.customInput = false;
        }
      });
    }
  }

  async fetchProviderAcceptableContracts() {
    if (this.providerUrl && this.assetId) {
      this.searching = true;
      this.clientService
        .fetchProviderAcceptableContracts(this.providerUrl, this.assetId).subscribe({
          next: result => this.providerAcceptableForAsset = result,
          error: (e) => {
            console.error(e);
            this.addLogMessage("Show provider's contracts: There was an error. Please check your EDC's output for details.");
            this.searching = false;
          },
          complete: () => {
            console.info('complete');
            this.searching = false;
            this.showAcceptableProviderContracts = true;
            this.addLogMessage("Fetched provider's accepted contracts.");
          }
        });
    } else {
      this.addLogMessage("Show provider's contracts: Provider URL and/or asset id missing")
    }
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

}
