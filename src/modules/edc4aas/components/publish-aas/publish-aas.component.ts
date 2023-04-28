import { Component, Inject, OnInit } from '@angular/core';
import { SelfDescriptionRegistrationService } from '../../services/self-description-registration.service';
import { CONNECTOR_DEFAULT_API } from '../../variables';


@Component({
  selector: 'publish-aas',
  templateUrl: './publish-aas.component.html',
  styleUrls: ['./publish-aas.component.scss']
})
export class PublishAASComponent {

  notFound: boolean = false;
  private provider: URL;

  aasUrl: string = "http://";
  aasPort: number = 8080;
  aasPath: string = "C:/festoDemoAAS.json";
  aasConfig: string = "";

  newestLog: string = new Date().toLocaleString() + ": ...";
  log: string = "";

  constructor(private selfDescriptionRegistrationService: SelfDescriptionRegistrationService,
    @Inject(CONNECTOR_DEFAULT_API) provider: URL) {
    this.provider = provider;
  }

  async registerAASByUrl() {
    var sanitized = this.aasUrl.toLowerCase().replace(" ", "%20");
    var request = this.selfDescriptionRegistrationService.registerUrl(this.provider, new URL(sanitized));
    request.subscribe({
      next: _ => _,
      error: (e) => {
        console.error(e);
        this.addLogMessage("Register via URL: There was an error. Please check your EDC's output or the dashboard's configuration for details.");
      },
      complete: () => {
        console.info('complete');
        this.addLogMessage("Registered AAS via URL " + this.aasUrl);
      }
    });
  }

  async registerAASByFile() {
    var sanitizedPath = this.aasPath.replace(/\\/g, "/");
    var sanitizedConfigPath = this.aasConfig.replace(/\\/g, "/");
    console.log(sanitizedPath, sanitizedConfigPath)
    if (this.aasConfig && this.aasConfig !== '') {
      this._registerAASByFileUsingConfig(sanitizedPath, sanitizedConfigPath);
      return;
    }
    if (new Number(this.aasPort)) {
      this._registerAASByFileUsingPort(sanitizedPath, +this.aasPort);
    }
  }

  private _registerAASByFileUsingConfig(aasPath: string, aasConfig: string) {
    var request = this.selfDescriptionRegistrationService.registerFileWithConfig(this.provider, aasPath, aasConfig);
    request.subscribe({
      next: _ => _,
      error: (e) => {
        console.error(e);
        this.addLogMessage("Register using config file: There was an error. Please check your EDC's output or the dashboard's configuration for details.");
      },
      complete: () => {
        console.info('complete');
        this.addLogMessage("Registered AAS.");
      }
    });
  }

  private _registerAASByFileUsingPort(aasPath: string, aasPort: number) {
    if (aasPort > 65536 || aasPort < 0) {
      alert("Port not in [0,2^16)");
      return;
    }
    var request = this.selfDescriptionRegistrationService.registerFileWithPort(this.provider, aasPath, aasPort);
    request.subscribe({
      next: _ => _,
      error: (e) => {
        console.error(e);
        this.addLogMessage("Register using port: There was an error. Please check your EDC's output or the dashboard's configuration for details.");
      },
      complete: () => {
        console.info('complete');
        this.addLogMessage("Registered AAS.");
      }
    });
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
