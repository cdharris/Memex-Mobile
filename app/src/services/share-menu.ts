// import ShareMenuAPI from "react-native-share-menu";
import { NativeModules } from "react-native";

export interface ShareMenu {
  getSharedText(callback: (text: string) => void): void;
}

export interface Props {}

export class ShareMenu {
  private shareAPI: ShareMenu;

  constructor(props: Props) {
    this.shareAPI = NativeModules.ShareMenuModule;
  }

  getShareText = () =>
    new Promise<string>(resolve =>
      this.shareAPI.getSharedText(text => {
        if (text && text.length) {
          return resolve(text);
        }
      })
    );
}
