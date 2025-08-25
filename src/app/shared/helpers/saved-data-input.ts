import { IAdditionalData, IMainData } from '@interface/index';

const savedMainData = localStorage.getItem('saved-form-mainData');
const savedAdditional = localStorage.getItem('saved-form-additional');

export let initialMainData: Partial<IMainData>;
export let initialAdditionalData: Partial<IAdditionalData>;
if (savedMainData && savedAdditional) {
  initialMainData = JSON.parse(savedMainData);
  initialAdditionalData = JSON.parse(savedAdditional);
}
