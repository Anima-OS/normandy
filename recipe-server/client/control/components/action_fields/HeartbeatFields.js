import React, { PropTypes as pt } from 'react';
import { connect } from 'react-redux';

import { ControlField } from 'control/components/Fields';
import { selector } from 'control/components/RecipeForm';
import ActionFields from 'control/components/action_fields/ActionFields';

/**
 * Form fields for the show-heartbeat action.
 */
export class HeartbeatFields extends ActionFields {
  render({ recipeArguments }) {
    return (
      <div className="arguments-fields">
        <p className="info">
          Shows a single message or survey prompt to the user.
        </p>
        <ControlField
          label="Survey ID"
          name="arguments.surveyId"
          component="input"
          type="text"
        />
        <ControlField
          label="Message"
          name="arguments.message"
          component="input"
          type="text"
        />
        <ControlField
          label="Engagement Button Label"
          name="arguments.engagementButtonLabel"
          component="input"
          type="text"
        />
        <ControlField
          label="Thanks Message"
          name="arguments.thanksMessage"
          component="input"
          type="text"
        />
        <ControlField
          label="Post-Answer URL"
          name="arguments.postAnswerUrl"
          component="input"
          type="text"
        />

        <ControlField
          label="Learn More Message"
          name="arguments.learnMoreMessage"
          component="input"
          type="text"
        />
        <ControlField
          label="Learn More URL"
          name="arguments.learnMoreUrl"
          component="input"
          type="text"
        />

        <ControlField
          label="How often should the prompt be shown?"
          name="arguments.repeatOption"
          component="select"
        >
          <option value="once" default>{`
            Do not show this prompt to users more than once.
          `}</option>
          <option value="nag">{`
            Show this prompt until the user clicks the button/stars,
            and then never again.
          `}</option>
          <option value="xdays">{`
            Allow re-prompting users who have already seen this prompt
            after ${(recipeArguments && recipeArguments.repeatEvery) || 'X'}
            days since they last saw it.
          `}</option>
        </ControlField>

        {
          recipeArguments.repeatOption === 'xdays' &&
            <ControlField
              label="Days before user is re-prompted"
              name="arguments.repeatEvery"
              component="input"
              type="number"
            />
        }

        <ControlField
          label="Include unique user ID in Post-Answer URL (and Telemetry)"
          name="arguments.includeTelemetryUUID"
          component="input"
          type="checkbox"
          className="checkbox-field"
        />
      </div>
    );
  }
}

HeartbeatFields.propTypes = {
  recipeArguments: pt.object.required,
};

export default connect(
  state => ({
    recipeArguments: selector(state, 'arguments'),
  })
)(HeartbeatFields);
