# Week 5 - Homework - **Google News 📰 🗞️**

## Introduction 🌟

Let's build a news 📰 app 📱 using [React Native](https://facebook.github.io/react-native/) & [Expo](https://expo.io/). Our app will help users find information about current world 🌎 events. We'll do so by requesting data from a 3rd party API and then consuming this data in our app.

![pwd](https://i.imgur.com/LUUDCrU.gif)

### Features 🎯🥇🏆

- [ ] The user can see a list of news articles loaded from an API.
- [ ] For each article the user sees a title, source, link to read more, and hero image.
- [ ] The user can see how long ago the story was published in a human-friendly format; e.g. "15 minutes ago".
- [ ] The user can see the total number of articles they've fetched from the API.
- [ ] When the user scrolls to the end of the list, the app automatically fetches more articles and appends them to the list of current articles(adds them to the bottom of our list).
- [ ] If the user pushes the "read more" button then the app opens up the article in the phones default browser.
- [ ] If the api request fails, the app should prompt the user.
- [ ] If the app is fetching additional articles, the user should be prompted accordingly.
- [ ] If the api has no more articles to fetch, the app should not make unnecessary api requests.
- [ ] If the user has fetched all the articles, the user should be prompted accordingly.

### Learning Objectives ✍️📚📝 ️

1. Learn how to [fetch()](https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data) data from an API.

   - Recognize data fetching **takes time**.
   - `fetch()` - Used to make requests to API.
     - The **1st** argument is the [api endpoint](https://stackoverflow.com/questions/2122604/what-is-an-endpoint) we're fetching data from.
     - The **2nd** is [options](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options).
   - `json()` - Used to **parse to JS** object.

2. Learn what `async` & `await` are used for. [Read more detailed async & await](https://alligator.io/js/async-functions/).

   - Recognize they're used to make asynchronous.
     - `async` - Tells JS that a function is **asynchronous**.
     - `await` - Tells JS that this line will **take a few moments**.

3. Learn what `try` & `catch` are used for.

   - Recognize they're when we need to be careful because our code may fail.
     An example is an api request. There are other [use cases](https://www.w3schools.com/java/java_try_catch.asp).

4. Learn what an open source library is and how to use them in our work.

   - Recognize [React Native Elements](https://react-native-training.github.io/react-native-elements/docs/getting_started.html) & [Moment](https://momentjs.com/docs/) are two of millions of free libraries publically available through [npm](https://www.npmjs.com/).

5. Learn how to render `n` items to the screen efficiently.
   - Recognize this is such a common requirement that React Native provides the component [FlatList](https://facebook.github.io/react-native/docs/flatlist) for this usecase.

> **Tip** 💡: Almost all apps use data fetched from an API. Work slowly through this lab to make sure you understand each step and why they're required.

### **Milestone 1 🛣🏃 Set up initial state of loading**

Let's indicate to the user we're working. Show a spinner on app load because we haven't gotten our data(news articles) yet and will immediately be working on fetching it.

**A)** Use `expo init` to create your project. I'm calling mine `rn-google-news`.

![pwd](https://i.imgur.com/mHoibGu.png)

**B)** Import the required functions from React that can add statefulness to our app.

```jsx
import React, { useState, useEffect } from 'react';
```

**C)** Import the `ActivityIndicator` component.

```jsx
import { ActivityIndicator } from 'react-native';
```

**D)** Define the `loading` variable/state, `setter` method, and initial value of `loading` in the `App` component's body as `true`.

```jsx
const [loading, setLoading] = useState(true);
```

**E)** Add a conditional to `App` which returns the `ActivityIndicator` in the event the app's state is `loading`.

```jsx
if (loading) {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
}
```

![pwd](https://i.imgur.com/rg7anmb.png)

**F)** Add style and pass the `loading` state to our `ActivityIndicator`'s `loading` prop. This will determine whether or not the spinner should spin.

```jsx
<View style={styles.container}>
  <ActivityIndicator size="large" loading={loading} />
</View>
```

![pwd](https://i.imgur.com/zsObVos.png)

We should now see that there's a spinner when the app loads _excellent_.

---

> Key Points 🔑📝

- Indicating to the user we're working on their behalf provides a nice experience.
- `ActivityIndicator` by React Native is a component which looks like a spinner.

---

### **Milestone 2 🛣🏃 Request data from the API**

We **need** to get the news articles **data**. We'll do so by using a combination of Javascript's `fetch`, `try`, `catch`, `async`, & `await` functions/keywords.

**A)** Get required api key.

Create an account [here](https://newsapi.org/s/google-news-api) to get the free api key we'll need. The api key will look something like this:

```js
  9eec2f7fe6cd4c40a3fef8f33f5778fa
```

**B)** Fetch the required data.

1. Define a function which will request the data we need. I'll call it `getNews`.

```jsx
const getNews = () => {
  // ... code soon ...
};
```

2. Use JS's `fetch` method in the body of this function to request data from the appropriate endpoint.
   The argument this function takes is the URL endpoint. You'll also neeed to pass the `apiKey` that you got in the previous step as a parameter in the request url; the `&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe` at the end.

```jsx
const getNews = () => {
  const response = fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe'
  );
};
```

3. Fire the `getNews` function when the component mounts by passing it to `useEffect()`. Add a `console.log` to the body of `getNews` to confirm.

```jsx
useEffect(getNews);
```

```jsx
const getNews = () => {
  console.log('getNews function firing');
  // ... code ...
};
```

![name](https://i.imgur.com/uo0HKvu.jpg)

You should now see what you console.logged in your debugging console.

**C)** Checkout the data we got from the api request by console.logging the `response`.

![name](https://i.imgur.com/bPtGfuh.jpg)

You should see something like this in your console. This is called a [Promise](https://javascript.info/promise-basics). Promises can become [much more complicated](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261).

#### For now, just understand that a promise is data that we will soon have

Because the `fetch` request takes **some amount of time** before it completes, our `getNews` function is constitutes what is known as an [asynchronous function](https://stackoverflow.com/questions/4559032/easy-to-understand-definition-of-asynchronous-event).

`Asynchronous` functions are so common that JS provides us a technique to handle them as if they were synchronous.

**D)** Add `async` & `await` to our function definition to handle the `Promise`.

```jsx
const getNews = async () => {
  // ... code ...
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe'
  );
};
```

#### You should now be able to see the response! As well as some complaints...

![name](https://i.imgur.com/lxNzIRh.jpg)

```chrome
An Effect function must not return anything besides a function, which is used for clean-up.
```

**E)** Update our `useEffect()` function call to get rid of this warning. If you want to be an advanced React dev one day, read why [here](https://overreacted.io/a-complete-guide-to-useeffect/).

```jsx
useEffect(() => {
  getNews();
}, []);
```

![name](https://i.imgur.com/MEaLx57.jpg)

Now we'll see that the complaint goes away.

We've almost got the data we need. We just need to complete **one more step**.

**F)** Use `json()` to parse the **JSON** response to a **JS** object. Add another `await` because response is a Promise and we need to wait for it before calling `json()`

```jsx
const getNews = async () => {
  // ... code ...
  const jsonData = await response.json();
};
```

### You should now be able **expand** the `jsonData` object and view it's shape.

## Questions ⁉️🤔😉

1. Do you know what **key** we're **interested in**?
2. What's the data inside this key?

![name](https://i.imgur.com/e2t3Ifn.gif)

**G)** Define a new piece of state, `articles`, to hold the data we get from the API. We **choose** to set it's initial state to an empty array because we want to maintain a **consistent datatype**.

```jsx
const [articles, setArticles] = useState([]);
```

**H)** Refactor `getNews` to set the state with the articles we get from the api.

```jsx
const getNews = async () => {
  // ... code ...
  setArticles(jsonData.articles);
};
```

You'll now see that now we're causing an [infinite loop](https://en.wikipedia.org/wiki/Infinite_loop), our request continuously fires.

![name](https://i.imgur.com/XjpqZgD.gif)

The reason this is occuring is because our hook fires when the component mounts, afterwards it updates state. The result of an update to our component's state is that our hook fires again; thus, the infinite loop.

**I)** Update the `useEffect()` to **not cause** the infinite loop.

```jsx
useEffect(() => {
  getNews();
}, []);
```

We should now see that the `getNews` logs in the console once, indicating that the function only fired once; excellent!

![name](https://i.imgur.com/Lmt0Cea.gif)

**J)** Hide the spinner when the data is fetched by setting our loading state to false.

```jsx
const getNews = async () => {
  // ... code ...
  setLoading(false);
};
```

![name](https://i.imgur.com/SFpQPD5.gif)
We should now see the `ActivitySpinner` display for a few moments while the API request processing. Then it hides when the request has completed. This is a **visual indicator** that we have our data, _excellent_.

---

> Key Points 🔑📝

- Making a request to an api takes time.
- Some of the keywords involved are `async`, `await`, `fetch()`, & `json()`.

---

### **Milestone 3 🛣🏃 Render news articles to screen**

**A)** Stop your packager & simulator and install two new packages using `npm`.

Run the following command in your terminal window to install the required dependencies.

```terminal
npm install react-native-elements moment
```

Afterward, run:

```terminal
npm install
```

Start your packager & simulator. If everything installed ok you should see two new entries in your `package.json`.

![name](https://i.imgur.com/dbKq5Xc.jpg)

**B)** Import the dependencies in order to render a card for each article.

```jsx
import moment from 'moment';
import { Card, Button } from 'react-native-elements';
```

**C)** Use the first article we have to test our [Card](https://react-native-training.github.io/react-native-elements/docs/card.html) component from [React Native Elements](https://react-native-training.github.io/react-native-elements/). Render one card with only a title & image in the body of our `return`. We need to pass `title` & `image` props to the Card component.

```jsx
<Card title={articles[0].title} image={{ uri: articles[0].urlToImage }} />
```

![name](https://i.imgur.com/21M030y.jpg)

We should now see one card displayed whenever the request has completed, _excellent_.

**D)** Grab `Icon` component from react native elements so we can complete the card.

```jsx
import { Icon } from 'react-native-elements';
```

**E)** Customize our cards style by defining some new styles at the bottom.

```jsx
const styles = StyleSheet.create({
  containerFlex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  }
});
```

**F)** Update `Card` to render all the required content in the body of our `return`.

```jsx
<Card title={articles[0].title} image={{ uri: articles[0].urlToImage }}>
  <View style={styles.row}>
    <Text style={styles.label}>Source</Text>
    <Text style={styles.info}>{articles[0].source.name}</Text>
  </View>
  <Text style={{ marginBottom: 10 }}>{articles[0].content}</Text>
  <View style={styles.row}>
    <Text style={styles.label}>Published</Text>
    <Text style={styles.info}>
      {moment(articles[0].publishedAt).format('LLL')}
    </Text>
  </View>
  <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
</Card>
```

![pwd](https://i.imgur.com/XvXLz3z.jpg)

You should now see a nicely formatted card with all the required data we need, _excellent_.

Also, notice that in the body of the card we used the `moment` function we installed a few steps back. We pass it an argument of a string date and format it the way we want. There are [many other formats](https://momentjs.com/).

```jsx
moment(articles[0].publishedAt).format('LLL');
```

**G)** Render every article to the screen

```jsx
{
  articles.map(article => {
    return (
      <Card title={article.title} image={{ uri: article.urlToImage }}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{article.source.name}</Text>
        </View>
        <Text style={{ marginBottom: 10 }}>{article.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(article.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
      </Card>
    );
  });
}
```

#### We should see multiple articles rendered to the screen now

![pwd](https://i.imgur.com/6N0s1Nd.jpg)

However, we also find **React complaining**. We need to add a `key` prop to the `Card` component because it's being rendered in a list. This is for [performance reasons](https://reactjs.org/docs/lists-and-keys.html).

More importantly, we **cannot scroll down** to view other articles we've fetched from the api.

![pwd](https://i.imgur.com/cqBNA6T.gif)

**H)** Fix the warning and implement scrolling in one go!

1. Import `FlatList` from React Native.

```jsx
import { FlatList } from 'react-native';
```

2. Render `FlatList` in the body of the return & pass it the appropriate props. Learn more about the props FlatList can take [here](https://facebook.github.io/react-native/docs/flatlist).

```jsx
<FlatList
  data={articles}
  renderItem={renderArticleItem}
  keyExtractor={item => item.title}
/>
```

3. Define the `renderArticleItem` function we passed to the `FlatList` component's prop `renderItem`. It should return the `Card` we previously had in the body of the `App` component(the jsx for rendering an article).

```jsx
const renderArticleItem = ({ item }) => {
  return (
    <Card title={item.title} image={{ uri: item.urlToImage }}>
      <View style={styles.row}>
        <Text style={styles.label}>Source</Text>
        <Text style={styles.info}>{item.source.name}</Text>
      </View>
      <Text style={{ marginBottom: 10 }}>{item.content}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Published</Text>
        <Text style={styles.info}>
          {moment(item.publishedAt).format('LLL')}
        </Text>
      </View>
      <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
    </Card>
  );
};
```

We should now see that the list of news articles is scrollable and the warning goes away, _nice_.

![pwd](https://i.imgur.com/9f1J4MW.gif)

---

> Key Points 🔑📝

- [React Native Elements](https://react-native-training.github.io/react-native-elements/docs/getting_started.html) is a library that provides beautifully styled components. We've used `Card`, `Icon`, & `Button`.
- [Moment](https://momentjs.com/docs/) is a library which helps us to parse dates to **human readable** formats. It works for other locales [as well](https://momentjs.com/docs/)!
- The `data` prop of `FlatList` is the list of items we want rendered.
- The `keyExtractor` prop of `FlatList` requires a function which returns a unique key for each item for performance reasons.
- The `renderItem` prop of `FlatList` requires a function which returns jsx for an individual list item. This function will take an `item` prop which is an individual `article`.

---

### **Milestone 4 🛣🏃 Implement fetching of additional articles**

**A)** Add some jsx to the top of the return to indicate articles **count**.

```jsx
<View style={styles.row}>
  <Text style={styles.label}>Articles Count:</Text>
  <Text style={styles.info}>{articles.length}</Text>
</View>
```

![pwd](https://i.imgur.com/8bxJK6K.jpg)

We should now see a **articles count** at the top.

However, if we scroll to the bottom, we'll see nothing happens(we dont grab additional articles from our api).

![pwd](https://i.imgur.com/e4iRPi2.gif)

**B)** Define a new piece of state `pageNumber`.

```jsx
const [pageNumber, setPageNumber] = useState(1);
```

**C)** Refactor `getNews` to use this state as well as update it after we've made the api request.

```jsx
const getNews = async () => {
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${pageNumber}`
  );
  const jsonData = await response.json();
  setArticles(articles.concat(jsonData.articles));
  setPageNumber(pageNumber + 1);
  setLoading(false);
};
```

1. We request a specific page number when we make this request, as indicated by the string concatination at the end of the url.

2. We need to concat our previous articles with the newly fetched articles.

**D)** Pass two new props to `FlatList` which will handle the behavior for fetching more articles when the user has scrolled to the end.

```jsx
<FlatList onEndReached={getNews} onEndReachedThreshold={1} />
```

Now we'll see that when the user scrolls to the bottom of the list our we **automatically fetch** additional articles. You'll notice the **articles count** increase at the top of the app.

![pwd](https://i.imgur.com/ggNvkfX.gif)

However, we're getting a ton of complaints from React. This is because we're firing our `getNews` very quickly and getting the same data. We need to fix this by removing duplicated articles from our array.

**G)** Define a new function outside our `App` component, `filterForUniqueArticles`, which filters out duplicate articles.

```javascript
const filterForUniqueArticles = arr => {
  const cleaned = [];
  arr.forEach(itm => {
    let unique = true;
    cleaned.forEach(itm2 => {
      const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
      if (isEqual) unique = false;
    });
    if (unique) cleaned.push(itm);
  });
  return cleaned;
};
```

**H)** Call this function in the body of our `getNews` and pass the return value to `setArticles`.

```jsx
const getNews = async () => {
  // ... code ...
  const newArticleList = filterForUniqueArticles(
    articles.concat(jsonData.articles)
  );
  setArticles(newArticleList);
  // ... code ...
};
```

![pwd](https://i.imgur.com/CiaiByl.gif)

Now we'll see that we've implemented fetching additional articles with **no warnings**, _yay_.

### **Milestone 5 🛣🏃 Add Polishing touches and safety mechanism**

**A)** Add a spinner to the bottom of the `FlatList` to let the user know we're fetching more `Articles` after they've reached the bottom.

```jsx
<FlatList
  ListFooterComponent={<ActivityIndicator size="large" loading={loading} />}
/>
```

We should now see that there's a spinner at the bottom of the `FlatList` when we get to the end for a few moments.

![pwd](https://i.imgur.com/9dFMwhc.gif)

**B)** Add `onPress` to the button so we can open up the article in the user's browser.

1. Import `Linking` from React Native.

```jsx
import { Linking } from 'react-native';
```

2. Define an `onPress` function in the body of our `App` component.

```jsx
const onPress = url => {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log(`Don't know how to open URL: ${url}`);
    }
  });
};
```

3. Pass our custom `onPress` function to the `onPress` prop of `Button`. This function takes the item's url as an argument.

```jsx
<Button onPress={() => onPress(item.url)} />
```

We should not be able to press/click on the button in order to navigate to the article in the phone's default browser, _excellent_.

![pwd](https://i.imgur.com/sU4XxgX.gif)

**C)** Wrap our api request `try` & `catch` to handle potential errors.

1. Define a new piece of state, `hasErrored`, with an initial state of `false` because when the app loads, the app hasn't made a request that has failed yet.

```jsx
const [hasErrored, setHasApiError] = useState(false);
```

2. Wrap our `getNews` functions body with a `try` & `catch`. If the request fails, we call `setHasApiError` with an argument of `true`.

```jsx
const getNews = async () => {
  setLoading(true);
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=6eec2f7fe6cd4c40a3fef8f33f5778fe&page=${pageNumber}`
    );
    const jsonData = await response.json();
    const newArticleList = filterForUniqueArticles(
      articles.concat(jsonData.articles)
    );
    setArticles(newArticleList);
    setPageNumber(pageNumber + 1);
  } catch (error) {
    setHasApiError(true);
  }
  setLoading(false);
};
```

3. Add a conditional return in the body of `App`.

```jsx
if (hasErrored) {
  return (
    <View style={styles.container}>
      <Text>Error =(</Text>
    </View>
  );
}
```

4. Deliberately fail the api by passing it a **nonsense endpoint** to test behavior.

```jsx
const response = await fetch(`https://wrongapi.com`);
```

We want to hide the spinner and notify the user if the request fails. The `try` & `catch` is useful for many other situations as well. In the event of a request failure, the user sees a prompt, in the event of success, the content; _amazing_.

![pwd](https://i.imgur.com/mqEtuW1.gif)

If you look closely however, we can seemingly load an infinite number of pages. This is because we haven't checked our response for new articles. In other words, we allow the user to request pages infinitely, despite the fact that the api may not have that many pages.

![pwd](https://i.imgur.com/zt27r3N.gif)

**D)** Handle case where the user has reached the last page.

1. Define a new piece of state, `lastPageReached`, which will initially be `false`.

```jsx
const [lastPageReached, setLastPageReached] = useState(false);
```

2. Add a conditional to the body of `getNews`. This conditional will set loading to `false` and return in the event we've reached the last page.

```jsx
if (lastPageReached) return;
```

3. Update our useEffect to monitor the articles piece of state only(not loading).

```jsx
useEffect(() => {
  getNews();
}, [articles]);
```

4. Add a conditional to the body of `getNews` within the `try` which will check for how many articles we got back from the api. In the event we've reached the last page, the length of articles will be 0.

```jsx
const hasMoreArticles = jsonData.articles.length > 0;
if (hasMoreArticles) {
  const newArticleList = filterForUniqueArticles(
    articles.concat(jsonData.articles)
  );
  setArticles(newArticleList);
  setPageNumber(pageNumber + 1);
} else {
  setLastPageReached(true);
}
```

5. Add a ternary operator to the `ListFooterComponent` prop of our `FlatList`. If there aren't more articles, return a prompt to the user. Otherwise, return the `ActivityIndicator` like before.

```jsx
ListFooterComponent={lastPageReached ? <Text>No more articles</Text> : <ActivityIndicator
  size="large"
  loading={loading}
/>}
```

We should now see that when we get to the bottom of the list, we **prompt the user** that there are **no more articles** and stopped making unnecessary api requests, **saving them money** on their data plan, _excellent_.

![pwd](https://i.imgur.com/gU12Ozu.gif)

> **Key Points** 🔑📝

- A lot of the work we do when we build apps is related to giving the user feedback.

- We can open up web pages in our app by using `Linking`.

- When something in our app may fail we should use `try` & `catch` as a safety mechanism.

---

## Review 💻🤓🤔

- Most apps requirie data of some form.
- API's can be called to fetch dynamic data.
- API requests are asynchronous.
- APIs are unique and we need to study their documentation in order to use them correctly.
- There are many public APIs [available](https://github.com/public-apis/public-apis).
- `FlatList` is a React Native component used to render `lists` of items in a performant way.
- There are many public libraries availaboe for specific use cases.

### Accomplishments 🥇🏆💯

- [x] The user can see a list of news articles loaded from an API.
- [x] For each article the user sees a title, source, link to read more, and hero image.
- [x] The user can see how long ago the story was published in a human-friendly format; e.g. "15 minutes ago".
- [x] The user can see the total number of articles they've fetched from the API.
- [x] When the user scrolls to the end of the list, the app automatically fetches more articles and appends them to the list of current articles(adds them to the bottom of our list).
- [x] If the user pushes the "read more" button then the app opens up the article in the phones default browser.
- [x] If the api request fails, the app should prompt the user.
- [x] If the app is fetching additional articles, the user should be prompted accordingly.
- [x] If the api has no more articles to fetch, the app should not make unnecessary api requests.
- [x] If the user has fetched all the articles, the user should be prompted accordingly.

### Rockets 🚀

- [ ] User can see a list of individual publishers.
- [ ] User can see how many articles each publisher has made.
- [ ] User can search articles by title.
