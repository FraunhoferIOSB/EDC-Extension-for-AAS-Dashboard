import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { CONNECTOR_DEFAULT_API } from "../variables";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientUrl: URL;
  constructor(private httpClient: HttpClient,
    @Inject(CONNECTOR_DEFAULT_API) provider: URL) {
    this.clientUrl = new URL(provider.toString().concat("/automated"));
  }

  public negotiateContractAndGetData(provider: URL, assetId: string, providerName?: String) {
    var requestUrl = new URL(this.clientUrl.toString().concat("/negotiate"));
    requestUrl.searchParams.append("providerUrl", provider.toString());
    requestUrl.searchParams.append("assetId", assetId);
    if (providerName) {
      requestUrl.searchParams.append("providerId", providerName.toString());
    }
    
    return this.httpClient.post<JSON>(requestUrl.toString(), null);
  }

  fetchAcceptedContracts() {
    var requestUrl = new URL(this.clientUrl.toString().concat("/acceptedContractOffers"));
    return this.httpClient.get<JSON>(requestUrl.toString());
  }

  fetchProviderAcceptableContracts(provider: URL, assetId: string) {
    var requestUrl = new URL(this.clientUrl.toString().concat("/contractOffers"));
    requestUrl.searchParams.append("assetId", assetId);
    requestUrl.searchParams.append("providerUrl", provider.toString());

    return this.httpClient.get<JSON>(requestUrl.toString());
  }

  addAcceptedContract(json: string) {
    var requestUrl = new URL(this.clientUrl.toString().concat("/acceptedContractOffers"));
    var headers = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpClient.post<JSON>(requestUrl.toString(), json, { headers });
  }

  public writeDataToHttpEndpoint(provider: URL, assetId: string, url: URL) {
    // Feature not in extension yet
  }
}
