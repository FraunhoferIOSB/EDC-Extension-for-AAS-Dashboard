import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetViewerComponent } from '../edc-demo/components/asset-viewer/asset-viewer.component';
import { CatalogBrowserComponent } from '../edc-demo/components/catalog-browser/catalog-browser.component';
import {
  ContractDefinitionViewerComponent
} from '../edc-demo/components/contract-definition-viewer/contract-definition-viewer.component';
import { ContractViewerComponent } from "../edc-demo/components/contract-viewer/contract-viewer.component";
import { IntroductionComponent } from '../edc-demo/components/introduction/introduction.component';
import { PolicyViewComponent } from "../edc-demo/components/policy-view/policy-view.component";
import {
  TransferHistoryViewerComponent
} from '../edc-demo/components/transfer-history/transfer-history-viewer.component';
import { ClientPageComponent } from '../edc4aas/components/client-service-page/client-page.component';
import { ConfigPageComponent } from '../edc4aas/components/config-page/config-page.component';
import { OwnSelfDescriptionBrowserComponent } from '../edc4aas/components/own-self-description-browser/own-self-description-browser.component';
import { SelfDescriptionBrowserComponent } from '../edc4aas/components/self-description-browser/self-description-browser.component';

export const routes: Routes = [
  {
    path: 'introduction',
    component: IntroductionComponent,
    data: { title: 'Getting Started', icon: 'info_outline' }
  },
  {
    path: 'catalog-browser',
    component: CatalogBrowserComponent,
    data: { title: 'Catalog Browser', icon: 'sim_card' }
  },
  {
    path: 'contracts',
    component: ContractViewerComponent,
    data: { title: 'Contracts', icon: 'attachment' }
  },
  {
    path: 'transfer-history',
    component: TransferHistoryViewerComponent,
    data: { title: 'Transfer History', icon: 'assignment' }
  },
  {
    path: 'contract-definitions',
    component: ContractDefinitionViewerComponent,
    data: { title: 'Contract Definitions', icon: 'rule' }
  },
  {
    path: 'policies',
    component: PolicyViewComponent,
    data: { title: 'Policies', icon: 'policy' }
  },
  {
    path: 'my-assets', // must not be "assets" to prevent conflict with assets directory
    component: AssetViewerComponent,
    data: { title: 'Assets', icon: 'upload' }
  },
  {
    path: 'my-aas',
    component: OwnSelfDescriptionBrowserComponent,
    data: { title: 'My Published AAS', icon: 'assignment' }
  },
  {
    path: 'aas',
    component: SelfDescriptionBrowserComponent,
    data: { title: 'Access Remote AAS', icon: 'assignment' }
  },
  { path: 'client/:1/:2',
  component: ClientPageComponent,
   data: { title: 'Automated Negotiation', icon: 'android' }
  },
  {
    path: 'config',
    component: ConfigPageComponent,
    data: { title: 'Configuration', icon: 'assignment' }
  },
  {
    path: '', redirectTo: 'introduction', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
