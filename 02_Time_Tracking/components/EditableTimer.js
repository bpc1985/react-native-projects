import React, { useState } from "react";
import PropTypes from "prop-types";
import TimerForm from "./TimerForm";
import Timer from "./Timer";

export default function EditableTimer({
  id,
  title,
  project,
  elapsed,
  isRunning,
  onUpdateSubmit,
  onRemoveSubmit,
  onStartPress,
  onStopPress
}) {
  const [editFormOpen, setEditFormOpen] = useState(false);

  const handleEditPress = () => {
    setEditFormOpen(true);
  };

  const handleFormClose = () => {
    setEditFormOpen(false);
  };

  const handleUpdateSubmit = timer => {
    onUpdateSubmit(timer);
    setEditFormOpen(false);
  };

  if (editFormOpen) {
    return (
      <TimerForm
        id={id}
        title={title}
        project={project}
        onFormSubmit={handleUpdateSubmit}
        onFormClose={handleFormClose}
      />
    );
  }
  return (
    <Timer
      id={id}
      title={title}
      project={project}
      elapsed={elapsed}
      isRunning={isRunning}
      onEditPress={handleEditPress}
      onRemovePress={onRemoveSubmit}
      onStartPress={onStartPress}
      onStopPress={onStopPress}
    />
  );
}

EditableTimer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  elapsed: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  onUpdateSubmit: PropTypes.func.isRequired,
  onRemoveSubmit: PropTypes.func.isRequired,
  onStartPress: PropTypes.func.isRequired,
  onStopPress: PropTypes.func.isRequired,
};
