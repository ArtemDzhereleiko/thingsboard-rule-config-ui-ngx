import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/public-api';
import { HomeComponentsModule } from '@home/components/public-api';
import { KvMapConfigComponent } from './kv-map-config.component';
import { DeviceRelationsQueryConfigComponent } from './device-relations-query-config.component';
import { RelationsQueryConfigComponent } from './relations-query-config.component';
import { MessageTypesConfigComponent } from './message-types-config.component';
import { CredentialsConfigComponent } from './credentials-config.component';
import { ArgumentsMapConfigComponent } from './arguments-map-config.component';
import { MathFunctionAutocompleteComponent } from './math-function-autocomplete.component';
import { OutputMessageTypeAutocompleteComponent } from './output-message-type-autocomplete.component';
import { KvMapConfigOldComponent } from './kv-map-config-old.component';
import { MsgMetadataChipComponent } from './msg-metadata-chip.component';
import { SvMapConfigComponent } from './sv-map-config.component';
import { RelationsQueryConfigOldComponent } from './relations-query-config-old.component';
import { SelectAttributesComponent } from './select-attributes.component';
import { AlarmStatusSelectComponent } from './alarm-status-select.component';
import { ExampleHintComponent } from './example-hint.component';

@NgModule({
  declarations: [
    KvMapConfigComponent,
    DeviceRelationsQueryConfigComponent,
    RelationsQueryConfigComponent,
    MessageTypesConfigComponent,
    CredentialsConfigComponent,
    ArgumentsMapConfigComponent,
    MathFunctionAutocompleteComponent,
    OutputMessageTypeAutocompleteComponent,
    KvMapConfigOldComponent,
    MsgMetadataChipComponent,
    SvMapConfigComponent,
    RelationsQueryConfigOldComponent,
    SelectAttributesComponent,
    AlarmStatusSelectComponent,
    ExampleHintComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeComponentsModule
  ],
  exports: [
    KvMapConfigComponent,
    DeviceRelationsQueryConfigComponent,
    RelationsQueryConfigComponent,
    MessageTypesConfigComponent,
    CredentialsConfigComponent,
    ArgumentsMapConfigComponent,
    MathFunctionAutocompleteComponent,
    OutputMessageTypeAutocompleteComponent,
    KvMapConfigOldComponent,
    MsgMetadataChipComponent,
    SvMapConfigComponent,
    RelationsQueryConfigOldComponent,
    SelectAttributesComponent,
    AlarmStatusSelectComponent,
    ExampleHintComponent
  ]
})

export class RulenodeCoreConfigCommonModule {
}
