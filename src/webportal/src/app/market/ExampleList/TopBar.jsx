// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
// to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
// BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, {useContext, useState, useEffect} from 'react';

import {getTheme, ColorClassNames} from '@uifabric/styling';
import {CommandBarButton, ActionButton} from 'office-ui-fabric-react/lib/Button';
import {SearchBox} from 'office-ui-fabric-react/lib/SearchBox';
import {CommandBar} from 'office-ui-fabric-react/lib/CommandBar';
import {ContextualMenuItemType} from 'office-ui-fabric-react/lib/ContextualMenu';

import Context from './Context';
import Filter from './Filter';
import { Stack } from 'office-ui-fabric-react';
import { Text } from 'office-ui-fabric-react/lib/Text';

/* eslint-disable react/prop-types */
function FilterButton({defaultRender: Button, ...props}) {
  const {subMenuProps: {items}} = props;
  const checkedItems = items.filter((item) => item.checked).map((item) => item.text);
  const checkedText = checkedItems.length === 0 ? null
    : checkedItems.length === 1 ? <strong>{checkedItems[0]}</strong>
    : <strong>{checkedItems[0]}{` (+${checkedItems.length - 1})`}</strong>;
  return (
    <Button {...props}>
      {checkedText}
    </Button>
  );
}

function KeywordSearchBox() {

  const {filter, setFilter} = useContext(Context);
  function onKeywordChange(keyword) {
    setFilter(new Filter(keyword));
  }

  /** @type {import('office-ui-fabric-react').IStyle} */
  const rootStyles = {backgroundColor: 'transparent', alignSelf: 'center', width: 220};
  return (
    <SearchBox 
      underlined
      placeholder="Filter by keyword"
      styles={{root: rootStyles}}
      value={filter.keyword}
      onChange={onKeywordChange}
    />
  );
}

function exampleCreateButton() {
  const { showExampleCreate, setShowExampleCreate } = useContext(Context);
  return (
    <ActionButton
        style={{ root:{backgroundColor: 'transparent'} }}
        onClick={()=>{setShowExampleCreate(true);}}
        name='Create example'
        iconProps= {{iconName: 'Add'}}
    >
      Create example
    </ActionButton>
  )
}

/* eslint-enable react/prop-types */

function TopBar() {
  const [active, setActive] = useState(true);
  const {refreshExamples, filter, setFilter, allCategories, allGroups } = useContext(Context);

  /**
   * @returns {import('office-ui-fabric-react').ICommandBarItemProps}
   */
  function getKeyword() {
    return {
      key: 'keyword',
      commandBarButtonAs: KeywordSearchBox,
    };
  }

  function getExampleCreate() {
    return {
      key: 'exampleCreate',
      commandBarButtonAs: exampleCreateButton
    };
  }

  /**
   * @returns {import('office-ui-fabric-react').ICommandBarItemProps}
   */
  function getCategory() {
    /**
     * @param {React.SyntheticEvent} event
     * @param {import('office-ui-fabric-react').IContextualMenuItem} item
     */
    function onClick(event, {key, checked}) {
      event.preventDefault();
      const {keyword, names, descriptions, categories, modules, groups} = filter;
      const tempSet = new Set(filter.categories);
      if (checked) {
        tempSet.delete(key);
      } else {
        tempSet.add(key);
      }
      setFilter(new Filter(keyword, names, descriptions, tempSet, modules, groups));
    }

    /**
     * @param {React.SyntheticEvent} event
     */
    function onClearClick(event) {
      event.preventDefault();
      const {keyword, names, descriptions, categories, modules, groups} = filter;
      setFilter(new Filter(keyword, names, descriptions, new Set(), modules, groups));
    }

    /**
     * @param {string} key
     * @param {string} text
     * @returns {import('office-ui-fabric-react').IContextualMenuItem}
     */
    function getItem(key) {
      return {
        key,
        text: key,
        canCheck: true,
        checked: filter.categories.has(key),
        onClick: onClick,
      };
    }

    return {
      key: 'categories',
      name: 'Category',
      buttonStyles: {root: {backgroundColor: 'transparent'}},
      iconProps: {
        iconName: 'AllAppsMirrored',
      },
      subMenuProps: {
        items: Object.keys(allCategories).map(getItem).concat([{
            key: 'divider',
            itemType: ContextualMenuItemType.Divider,
          },
          {
            key: 'clear',
            text: 'Clear',
            onClick: onClearClick,
          },
        ]),
      },
      commandBarButtonAs: FilterButton,
    };
  }

    /**
   * @returns {import('office-ui-fabric-react').ICommandBarItemProps}
   */
  function getGroup() {
    /**
     * @param {React.SyntheticEvent} event
     * @param {import('office-ui-fabric-react').IContextualMenuItem} item
     */
    function onClick(event, {key, checked}) {
      event.preventDefault();
      const {keyword, names, descriptions, categories, modules, groups} = filter;
      const tempSet = new Set(filter.groups);
      if (checked) {
        tempSet.delete(key);
      } else {
        tempSet.add(key);
      }
      setFilter(new Filter(keyword, names, descriptions, categories, modules, tempSet));
    }

    /**
     * @param {React.SyntheticEvent} event
     */
    function onClearClick(event) {
      event.preventDefault();
      const {keyword, names, descriptions, categories, modules, groups} = filter;
      setFilter(new Filter(keyword, names, descriptions, categories, modules, new Set()));
    }

    /**
     * @param {string} key
     * @param {string} text
     * @returns {import('office-ui-fabric-react').IContextualMenuItem}
     */
    function getItem(key) {
      return {
        key,
        text: key,
        canCheck: true,
        checked: filter.groups.has(key),
        onClick: onClick,
      };
    }

    return {
      key: 'groups',
      name: 'Group',
      buttonStyles: {root: {backgroundColor: 'transparent'}},
      iconProps: {
        iconName: 'BranchFork2',
      },
      subMenuProps: {
        items: Object.keys(allGroups).map(getItem).concat([{
            key: 'divider',
            itemType: ContextualMenuItemType.Divider,
          },
          {
            key: 'clear',
            text: 'Clear',
            onClick: onClearClick,
          },
        ]),
      },
      commandBarButtonAs: FilterButton,
    };
  }


  /**
   * @returns {import('office-ui-fabric-react').ICommandBarItemProps}
   */
  function getRefresh() {
    return {
      key: 'refresh',
      name: 'Refresh',
      buttonStyles: {root: {backgroundColor: 'transparent', height: '100%'}},
      iconProps: {
        iconName: 'Refresh',
      },
      onClick: refreshExamples,
    };
  }

  /**
   * @returns {import('office-ui-fabric-react').ICommandBarItemProps}
  */
  function getFilters() {
    return {
      key: 'filters',
      name: 'Filters',
      iconProps: {iconName: 'Filter'},
      menuIconProps: {iconName: active ? 'ChevronUp' : 'ChevronDown'},
      onClick() {
        setActive(!active);
      },
      onRender(item) {
        return (
          <CommandBarButton
            onClick={item.onClick}
            iconProps={item.iconProps}
            menuIconProps={item.menuIconProps}
            styles={{root: {backgroundColor: 'transparent'}}}
          >
            Filter
          </CommandBarButton>
        );
      },
    };
  }

  const topBarItems = [
    getRefresh()
  ];
  const topBarFarItems = [
    getExampleCreate(),
    getFilters()
  ];

  const filterBarItems = [
    getKeyword()
  ];
  const filterBarFarItems = [
    getGroup(),
    getCategory()
  ];

  const {spacing} = getTheme();

  return (
    <React.Fragment>
      <CommandBar
        items={topBarItems}
        farItems={topBarFarItems}
        styles={{root: {backgroundColor: 'transparent', padding: 0}}}
      />
      { active ? <CommandBar
        items={filterBarItems}
        farItems={filterBarFarItems}
        styles={{root: [
          ColorClassNames.neutralLightBackground,
          {marginTop: spacing.s2, paddingTop: spacing.m, paddingBottom: spacing.m, height: 'auto'},
        ]}}
      /> : null }
    </React.Fragment>
  );
}

export default TopBar;