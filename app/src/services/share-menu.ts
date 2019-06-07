import ShareMenuAPI from "react-native-share-menu";

export interface Props {
  shareAPI?: typeof ShareMenuAPI;
}

export class ShareMenu {
  private shareAPI: typeof ShareMenuAPI;

  constructor({ shareAPI = ShareMenuAPI }: Props) {
    this.shareAPI = shareAPI;
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
