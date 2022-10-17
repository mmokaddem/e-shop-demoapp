import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, CdkStepperModule, RouterModule],
  exports: [
    OrderTotalsComponent,
    ReactiveFormsModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
