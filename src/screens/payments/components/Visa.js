import React from 'react';
import Svg, { Path, G, Rect, Defs } from 'react-native-svg';
import { hp, wp } from '../../../constants/dimension';

function Visa() {
  return (
    <Svg width={wp(35)} height={hp(21.95)} viewBox="0 0 8 3" fill="none">
    <Path d="M2.48534 2.12063L2.84118 0.0424652H3.41034L3.05424 2.12063H2.48534Z" fill="#0E4595"/>
    <Path d="M5.1105 0.0872824C4.99775 0.0451805 4.82106 0 4.6004 0C4.038 0 3.64186 0.281858 3.63848 0.685818C3.63531 0.984427 3.92129 1.15101 4.13718 1.25041C4.35873 1.35229 4.43321 1.41725 4.43214 1.5082C4.43072 1.64751 4.25522 1.71113 4.09162 1.71113C3.86383 1.71113 3.74281 1.67963 3.55588 1.60206L3.48253 1.56902L3.40266 2.03424C3.5356 2.09226 3.78141 2.14251 4.03666 2.14512C4.63496 2.14512 5.02335 1.86648 5.02777 1.4351C5.02989 1.19868 4.87826 1.01879 4.54989 0.870467C4.35096 0.774331 4.22912 0.710181 4.23041 0.612835C4.23041 0.526454 4.33354 0.434087 4.55637 0.434087C4.74248 0.43121 4.87731 0.471603 4.98236 0.513705L5.03336 0.537686L5.1105 0.0872824Z" fill="#0E4595"/>
    <Path d="M6.57512 0.0424576H6.13533C5.99909 0.0424576 5.89713 0.0794639 5.8373 0.214793L4.99203 2.11927H5.58969C5.58969 2.11927 5.6874 1.86321 5.7095 1.80698C5.77481 1.80698 6.35542 1.80787 6.43842 1.80787C6.45544 1.88063 6.50766 2.11927 6.50766 2.11927H7.03579L6.57512 0.0424576ZM5.87734 1.38437C5.92442 1.26463 6.10411 0.803434 6.10411 0.803434C6.10076 0.808965 6.15084 0.683116 6.17957 0.60509L6.21804 0.784262C6.21804 0.784262 6.32702 1.28032 6.3498 1.38434H5.87734V1.38437V1.38437Z" fill="#0E4595"/>
    <Path d="M0.00727083 0.0424576L0 0.0856876C0.224992 0.139891 0.425941 0.218344 0.601875 0.315937L1.1069 2.11729L1.70908 2.11663L2.60512 0.0424576H2.00219L1.44498 1.45961L1.38562 1.1716C1.38284 1.1627 1.37982 1.15379 1.37673 1.14485L1.18302 0.217907C1.14858 0.0863147 1.04866 0.0470436 0.925042 0.0424576H0.00727083Z" fill="#0E4595"/>
    </Svg>
  )
}

export default Visa;