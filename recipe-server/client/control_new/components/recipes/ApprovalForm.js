import { Button, Form, Input, Modal } from 'antd';
import autobind from 'autobind-decorator';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import FormActions from 'control_new/components/common/FormActions';
import { createForm, FormItem } from 'control_new/components/common/forms';
import * as approvalRequestActions from 'control_new/state/approvalRequests/actions';


@connect(
  null,
  {
    closeApprovalRequest: approvalRequestActions.closeApprovalRequest,
  },
)
@createForm({})
@autobind
export default class ApprovalForm extends React.Component {
  static propTypes = {
    approvalRequest: PropTypes.instanceOf(Map).isRequired,
    closeApprovalRequest: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  handleApproveClick(event) {
    this.props.onSubmit(event, { approved: true });
  }

  handleRejectClick(event) {
    this.props.onSubmit(event, { approved: false });
  }

  handleCloseButtonClick() {
    const { approvalRequest, closeApprovalRequest } = this.props;
    Modal.confirm({
      title: 'Are you sure you want to close this approval request?',
      onOk() {
        closeApprovalRequest(approvalRequest.get('id'));
      },
    });
  }

  render() {
    return (
      <Form>
        <FormItem name="comment">
          <Input placeholder="Comment" />
        </FormItem>
        <FormActions>
          <FormActions.Primary>
            <Button icon="dislike" onClick={this.handleRejectClick} type="danger">
                Reject
              </Button>
            <Button icon="like" onClick={this.handleApproveClick} type="primary">
              Approve
            </Button>
          </FormActions.Primary>
          <FormActions.Secondary>
            <Button icon="close-circle" onClick={this.handleCloseButtonClick}>
              Close
            </Button>
          </FormActions.Secondary>
        </FormActions>
      </Form>
    );
  }
}