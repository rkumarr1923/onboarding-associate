import {render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import mockFetch from "./mocks/mockFetch";
import UploadDocument from "./UploadDocument"

import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Test UploadDocument.js', () => {

  it("Should render app without crashing", () => {
      expect(
          JSON.stringify(
            Object.assign({}, UploadDocument, { _reactInternalInstance: 'censored' }),
          ),
        ).toMatchSnapshot();
  });
});