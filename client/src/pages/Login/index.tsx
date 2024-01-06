import { Component } from "react";
import { Form, Input, Button, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Redirect } from "react-router";
import qs from "qs";
import request from "../../request";
import "./style.css";

class LoginForm extends Component {
  state = { isLogin: false };
  onFinish = (values: any) => {
    request
      .post("/api/login", qs.stringify(values), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res: any) => {
        const dada: responseResult.login = res.data;
        if (dada) {
          this.setState({ isLogin: true });
          message.success("登入成功");
        } else {
          message.error("登入失敗");
        }
      });
  };

  render() {
    const { isLogin } = this.state;
    return isLogin ? (
      <Redirect to="/" />
    ) : (
      <div className="login-page">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: "請輸入登入密碼!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登入
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
