import {
  PaymentData,
  Configuration,
  PaymentJsonData,
  DetailsOfPayment,
} from '../types';
import { NativeModules } from 'react-native';

const { CreditCardForm: CreditCardFormManager } = NativeModules;

class CreditCardForm {
  private static instance: CreditCardForm;

  private constructor(paymentData: PaymentData, jsonData?: PaymentJsonData) {
    CreditCardForm.saveInitialPaymentData(paymentData, jsonData)
  }

  public static initialPaymentData(
    paymentData: PaymentData,
    jsonData: PaymentJsonData = {}
  ): CreditCardForm {
    if (!CreditCardForm.instance) {
      CreditCardForm.instance = new CreditCardForm(paymentData, jsonData);
    }

    CreditCardForm.saveInitialPaymentData(paymentData, jsonData)
    return CreditCardForm.instance;
  }

  public setDetailsOfPayment(details: DetailsOfPayment): void {
    CreditCardFormManager.setDetailsOfPayment(details);
  }

  private static saveInitialPaymentData(paymentData: PaymentData, jsonData?: PaymentJsonData): void {
    const jsonDataString = jsonData && JSON.stringify(jsonData);
    CreditCardFormManager.initialPaymentData(paymentData, jsonDataString);
  }

  public showCreditCardForm = async ({
    useDualMessagePayment,
    disableGPay = true,
    disableYandexPay = true,
  }: Configuration): Promise<number> => {
    const transactionId: number =
      await CreditCardFormManager.showCreditCardForm({
        disableGPay,
        useDualMessagePayment,
        disableYandexPay,
      });
    return transactionId;
  };
}

export default CreditCardForm;
