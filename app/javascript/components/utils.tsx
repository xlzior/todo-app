import * as React from 'react';

const isNameRelevant = (searchTerm: string) => (name: string) => {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

export const filterForRelevant = (array: any[], getName, searchTerm: string) => {
  if (searchTerm === "") {
    return array;
  } else {
    const isNameRelevantToSearchTerm = isNameRelevant(searchTerm);
    return array.filter(elem => isNameRelevantToSearchTerm(getName(elem)));
  }
}

export function useOnClickOutside(ref: React.MutableRefObject<any>, fn: () => void, deps: any[]) {
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, ...deps]);
}