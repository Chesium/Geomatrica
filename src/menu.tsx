import React from "react";

export class N3 extends React.Component<{
  name: string;
  lCtx: string;
  rCtx?: string;
  addhr?: boolean;
}> {
  render(): React.ReactNode {
    return (
      <li className="nav-L2">
        <div>
          <p className="p-left">{this.props.lCtx}</p>
          {this.props.rCtx != undefined && <p className="p-right">{this.props.rCtx}</p>}
          {this.props.addhr && <hr />}
        </div>
      </li>
    );
  }
}

export class N2 extends React.Component<{
  name: string;
  lCtx: string;
  rCtx?: string;
  addhr?: boolean;
  haveN3: boolean;
}> {
  render(): React.ReactNode {
    return (
      <li className="nav-L2">
        <div>
          <p className="p-left">{this.props.lCtx}</p>
          {this.props.rCtx != undefined && <p className="p-right">{this.props.rCtx}</p>}
          {this.props.addhr && <hr />}
        </div>
        {this.props.haveN3 && <ul className="navls-L2">{this.props.children}</ul>}
      </li>
    );
  }
}

export class N1 extends React.Component<{ name: string; ctx: string }> {
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

export class Menu extends React.Component<{}> {
  render(): React.ReactNode {
    return <ul className="menu">{this.props.children}</ul>;
  }
}
