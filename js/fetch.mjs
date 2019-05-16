export function getCategories() {
  fetch('http://komediehuset.com/wp-json/wp/v2/categories?parent=46&per_page=100')
    .then(function(response) {
      return response.json();
    })
    .then(function(categories) {
      console.log(categories)
      appendCategories(categories);
    });
};
