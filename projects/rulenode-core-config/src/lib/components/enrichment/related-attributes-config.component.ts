import { Component } from '@angular/core';
import { AppState, deepTrim, isDefinedAndNotNull } from '@core/public-api';
import { entityFields, RuleNodeConfiguration, RuleNodeConfigurationComponent } from '@shared/public-api';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  allowedOriginatorFields,
  DataToFetch,
  dataToFetchTranslations,
  FetchTo,
  msgMetadataLabelTranslations,
  SvMapOption
} from '../../rulenode-core-config.models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tb-enrichment-node-related-attributes-config',
  templateUrl: './related-attributes-config.component.html',
  styleUrls: ['../../../../style.scss']
})
export class RelatedAttributesConfigComponent extends RuleNodeConfigurationComponent {

  relatedAttributesConfigForm: FormGroup;

  protected readonly DataToFetch = DataToFetch;

  public msgMetadataLabelTranslations = msgMetadataLabelTranslations;
  public originatorFields: SvMapOption[] = [];
  public fetchToData = [];

  constructor(protected store: Store<AppState>,
              private fb: FormBuilder,
              private translate: TranslateService) {
    super(store);
    for (const field of Object.keys(allowedOriginatorFields)) {
      this.originatorFields.push({
        value: allowedOriginatorFields[field].value,
        name: this.translate.instant(allowedOriginatorFields[field].name)
      });
    }
    for (const key of dataToFetchTranslations.keys()) {
      this.fetchToData.push({
        value: key,
        name: this.translate.instant(dataToFetchTranslations.get(key as DataToFetch))
      });
    }
  }

  protected configForm(): FormGroup {
    return this.relatedAttributesConfigForm;
  }

  protected prepareOutputConfig(configuration: RuleNodeConfiguration): RuleNodeConfiguration {
    if (configuration.dataToFetch === DataToFetch.FIELDS) {
      configuration.dataMapping = configuration.svMap;
      delete configuration.svMap;
    } else {
      configuration.dataMapping = configuration.kvMap;
      delete configuration.kvMap;
    }

    const filteDataMapping = {};
    if (configuration && configuration.dataMapping) {
      for (const key of Object.keys(configuration.dataMapping)) {
        filteDataMapping[key.trim()] = configuration.dataMapping[key];
      }
    }
    configuration.dataMapping = filteDataMapping;
    delete configuration.svMap;
    delete configuration.kvMap;

    return deepTrim(configuration);
  }

  protected prepareInputConfig(configuration: RuleNodeConfiguration): RuleNodeConfiguration {
    let svMap = {
      [entityFields.name.value]: `relatedEntity${this.translate.instant(entityFields.name.name)}`
    };
    let kvMap = {
      serialNumber: 'sn'
    };

    let dataToFetch: DataToFetch;
    if (isDefinedAndNotNull(configuration?.telemetry)) {
      dataToFetch = configuration.telemetry ? DataToFetch.LATEST_TELEMETRY : DataToFetch.ATTRIBUTES;
    } else {
      dataToFetch = isDefinedAndNotNull(configuration?.dataToFetch) ? configuration.dataToFetch : DataToFetch.ATTRIBUTES;
    }

    let dataMapping;
    if (isDefinedAndNotNull(configuration?.attrMapping)) {
      dataMapping = configuration.attrMapping;
    } else {
      dataMapping = isDefinedAndNotNull(configuration?.dataMapping) ? configuration.dataMapping : null;
    }

    if (dataToFetch === DataToFetch.FIELDS) {
      svMap = dataMapping;
    } else {
      kvMap = dataMapping;
    }

    return {
      relationsQuery: isDefinedAndNotNull(configuration?.relationsQuery) ? configuration.relationsQuery : null,
      dataToFetch,
      svMap,
      kvMap,
      fetchTo: isDefinedAndNotNull(configuration?.fetchTo) ? configuration.fetchTo : FetchTo.METADATA
    };
  }

  public selectTranslation(latestTelemetryTranslation: string, attributesTranslation: string) {
    if (this.relatedAttributesConfigForm.get('dataToFetch').value === DataToFetch.LATEST_TELEMETRY) {
      return latestTelemetryTranslation;
    } else {
      return attributesTranslation;
    }
  }

  protected onConfigurationSet(configuration: RuleNodeConfiguration) {
    this.relatedAttributesConfigForm = this.fb.group({
      relationsQuery: [configuration.relationsQuery, [Validators.required]],
      dataToFetch: [configuration.dataToFetch, []],
      kvMap: [configuration.kvMap, [Validators.required]],
      svMap: [configuration.svMap, [Validators.required]],
      fetchTo: [configuration.fetchTo, []]
    });
  }

  protected validatorTriggers(): string[] {
    return ['dataToFetch'];
  }

  protected updateValidators(emitEvent: boolean) {
    if (this.relatedAttributesConfigForm.get('dataToFetch').value === DataToFetch.FIELDS) {
      this.relatedAttributesConfigForm.get('svMap').enable({emitEvent: false});
      this.relatedAttributesConfigForm.get('kvMap').disable({emitEvent: false});
      this.relatedAttributesConfigForm.get('svMap').updateValueAndValidity();
    } else {
      this.relatedAttributesConfigForm.get('svMap').disable({emitEvent: false});
      this.relatedAttributesConfigForm.get('kvMap').enable({emitEvent: false});
      this.relatedAttributesConfigForm.get('kvMap').updateValueAndValidity();
    }
  }
}
