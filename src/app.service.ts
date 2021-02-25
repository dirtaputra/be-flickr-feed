import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { toJson } from 'xml2json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getFeed() {
    const feedData: any = await axios.get(
      'https://www.flickr.com/services/feeds/photos_public.gne',
    );
    const feed: any = toJson(feedData.data);
    return feed;
  }
}
