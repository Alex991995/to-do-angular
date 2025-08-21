import { Country } from '@interface/index';

export function convertPhoneMask(chosenCountry: Country) {
  let mask = '';
  if (typeof chosenCountry.mask === 'object') {
    mask = chosenCountry.mask[0];
    return mask.replaceAll(/#/g, '0') as string;
  }
  mask = chosenCountry.mask;
  return mask.replaceAll(/#/g, '0') as string;
}
