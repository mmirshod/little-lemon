import { useEffect, useRef } from 'react';

export function getSectionListData(data) {
  return data.reduce((acc, item) => {
    const existingCategory = acc.find(cat => cat.title === item.category);
    if (existingCategory)
      existingCategory.data.push({
        id: item.id,
        name: item.name,
        price: item.price,
        description: item.description,
        image: item.image,
      });
    else
      acc.push({
        title: item.category,
        data: [{
          id: item.id,
          name: item.name,
          price: item.price,
          description: item.description,
          image: item.image,
        }]
      })

    return acc;
  }, []);
}

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current)
      isInitialMount.current = false;
    else
      return effect();
  }, dependencies);
}