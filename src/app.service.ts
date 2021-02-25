import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { toJson } from 'xml2json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getFeed() {
    // get data from flickr
    const feedData: any = await axios.get(
      'https://www.flickr.com/services/feeds/photos_public.gne',
    );

    // Parse to Json
    const data: any = toJson(feedData.data);
    const feed = JSON.parse(data);

    console.log(feed.feed.entry);

    // Destructure Field Data
    let feedArr = [];
    for await (const data of feed.feed.entry) {
      const feedObject = {
        title: data.title,
        pict: data.link[1].href,
        published: data.published,
        author: data.author.name,
      };
      feedArr.push(feedObject);
    }
    return feedArr;
  }
}
