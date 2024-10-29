import { Component } from '@angular/core';
import { AppState } from '@core/public-api';
import { RuleNodeConfiguration, RuleNodeConfigurationComponent } from '@shared/public-api';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpRequestType, IntLimit } from '../../rulenode-core-config.models';

@Component({
  selector: 'tb-external-node-rest-api-call-config',
  templateUrl: './rest-api-call-config.component.html',
  styleUrls: []
})
export class RestApiCallConfigComponent extends RuleNodeConfigurationComponent {

  restApiCallConfigForm: UntypedFormGroup;

  readonly proxySchemes: string[] = ['http', 'https'];
  readonly httpRequestTypes = Object.keys(HttpRequestType);
  readonly MemoryBufferSizeInKbLimit = 25000;
  readonly IntLimit = IntLimit;

  constructor(protected store: Store<AppState>,
              private fb: UntypedFormBuilder) {
    super(store);
  }

  protected configForm(): UntypedFormGroup {
    return this.restApiCallConfigForm;
  }

  protected onConfigurationSet(configuration: RuleNodeConfiguration) {
    this.restApiCallConfigForm = this.fb.group({
      restEndpointUrlPattern: [configuration ? configuration.restEndpointUrlPattern : null, [Validators.required]],
      requestMethod: [configuration ? configuration.requestMethod : null, [Validators.required]],
      useSimpleClientHttpFactory: [configuration ? configuration.useSimpleClientHttpFactory : false, []],
      parseToPlainText: [configuration ? configuration.parseToPlainText : false, []],
      ignoreRequestBody: [configuration ? configuration.ignoreRequestBody : false, []],
      enableProxy: [configuration ? configuration.enableProxy : false, []],
      useSystemProxyProperties: [configuration ? configuration.enableProxy : false, []],
      proxyScheme: [configuration ? configuration.proxyHost : null, []],
      proxyHost: [configuration ? configuration.proxyHost : null, []],
      proxyPort: [configuration ? configuration.proxyPort : null, []],
      proxyUser: [configuration ? configuration.proxyUser :null, []],
      proxyPassword: [configuration ? configuration.proxyPassword :null, []],
      readTimeoutMs: [configuration ? configuration.readTimeoutMs : null, [Validators.min(0), Validators.max(IntLimit)]],
      maxParallelRequestsCount: [configuration ? configuration.maxParallelRequestsCount : null, [Validators.min(0), Validators.max(IntLimit)]],
      headers: [configuration ? configuration.headers : null, []],
      credentials: [configuration ? configuration.credentials : null, []],
      maxInMemoryBufferSizeInKb: [configuration ? configuration.maxInMemoryBufferSizeInKb : null, [Validators.min(1), Validators.max(this.MemoryBufferSizeInKbLimit)]]
    });
  }

  protected validatorTriggers(): string[] {
    return ['useSimpleClientHttpFactory', 'enableProxy', 'useSystemProxyProperties'];
  }

  protected updateValidators(emitEvent: boolean) {
    const useSimpleClientHttpFactory: boolean = this.restApiCallConfigForm.get('useSimpleClientHttpFactory').value;
    const enableProxy: boolean = this.restApiCallConfigForm.get('enableProxy').value;
    const useSystemProxyProperties: boolean = this.restApiCallConfigForm.get('useSystemProxyProperties').value;

    if (enableProxy && !useSystemProxyProperties) {
      this.restApiCallConfigForm.get('proxyHost').setValidators(enableProxy ? [Validators.required] : []);
      this.restApiCallConfigForm.get('proxyPort').setValidators(enableProxy ?
        [Validators.required, Validators.min(1), Validators.max(65535)] : []);
    } else {
      this.restApiCallConfigForm.get('proxyHost').setValidators([]);
      this.restApiCallConfigForm.get('proxyPort').setValidators([]);

      if (useSimpleClientHttpFactory) {
        this.restApiCallConfigForm.get('readTimeoutMs').setValidators([]);
      } else {
        this.restApiCallConfigForm.get('readTimeoutMs').setValidators([Validators.min(0), Validators.max(IntLimit)]);
      }
    }

    this.restApiCallConfigForm.get('readTimeoutMs').updateValueAndValidity({emitEvent});
    this.restApiCallConfigForm.get('proxyHost').updateValueAndValidity({emitEvent});
    this.restApiCallConfigForm.get('proxyPort').updateValueAndValidity({emitEvent});
    this.restApiCallConfigForm.get('credentials').updateValueAndValidity({emitEvent});
  }
}
