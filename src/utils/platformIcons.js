import { FaWindows } from 'react-icons/fa6';
import { SiPlaystation, SiNintendo, SiSega } from 'react-icons/si';
import {
  FaXbox,
  FaAppStoreIos,
  FaAndroid,
  FaLinux,
  FaApple
} from 'react-icons/fa';

export const platformIcons = [
  { keyword: 'playstation', icon: SiPlaystation },
  { keyword: 'xbox', icon: FaXbox },
  { keyword: 'pc', icon: FaWindows },
  { keyword: 'ios', icon: FaAppStoreIos },
  { keyword: 'android', icon: FaAndroid },
  { keyword: 'nintendo', icon: SiNintendo },
  { keyword: 'macos', icon: FaApple },
  { keyword: 'linux', icon: FaLinux },
  { keyword: 'sega', icon: SiSega }
];
