import React, { PropsWithChildren } from "react";
import blankIconUrl from "../assets/blank.svg?url";
import expandIconUrl from "../assets/expand.svg?url";
export class N3 extends React.Component<{
  name: string;
  lCtx: string;
  rCtx?: string;
}> {
  render(): React.ReactNode {
    return (
      <li className="nav-L2">
        <div>
          <p className="p-left">{this.props.lCtx}</p>
          {this.props.rCtx != undefined && (
            <p className="p-right">{this.props.rCtx}</p>
          )}
          <img className="expand-icon" src={blankIconUrl} alt="" />
        </div>
      </li>
    );
  }
}

export class N2 extends React.Component<
  PropsWithChildren<{
    name: string;
    lCtx: string;
    rCtx?: string;
    haveN3: boolean;
  }>
> {
  render(): React.ReactNode {
    return (
      <li className="nav-L2">
        <div>
          <p className="p-left">{this.props.lCtx}</p>
          {this.props.rCtx != undefined && (
            <p className="p-right">{this.props.rCtx}</p>
          )}
          {this.props.haveN3 ? (
            <img className="expand-icon" src={expandIconUrl} alt="" />
          ) : (
            <img className="expand-icon" src={blankIconUrl} alt="" />
          )}
        </div>
        {this.props.haveN3 && (
          <ul className="navls-L2">{this.props.children}</ul>
        )}
      </li>
    );
  }
}

export class N1 extends React.Component<
  PropsWithChildren<{ name: string; ctx: string }>
> {
  render(): React.ReactNode {
    return (
      <li className="nav-L1">
        <div>
          <p>{this.props.ctx}</p>
        </div>
        <ul className="navls-L1">{this.props.children}</ul>
      </li>
    );
  }
}

export class Menu extends React.Component<PropsWithChildren> {
  render(): React.ReactNode {
    return <ul className="menu">{this.props.children}</ul>;
  }
}
