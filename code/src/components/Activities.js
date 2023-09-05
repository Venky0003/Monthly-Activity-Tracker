import React from 'react';

class Activities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: '',
      activities: [],
    };
  }

  componentDidMount() {
    if (localStorage.acts) {
      this.setState({ activities: JSON.parse(localStorage.acts) || [] });
    }
    this.eventId = window.addEventListener(
      'beforeunload',
      this.handleUpdateLocalStorage
    );
  }

  // clearing the eventId
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleUpdateLocalStorage);
  }

  handleUpdateLocalStorage = () => {
    console.log('Updating localStorage');
    localStorage.setItem('acts', JSON.stringify(this.state.activities));
  };

  handleActivityChange = (event) => {
    this.setState({ activityName: event.target.value });
  };

  handleAddActivity = () => {
    let { activities, activityName } = this.state;

    if (activityName.trim() !== '') {
      const newActivity = {
        id: Date.now(),
        name: activityName,
        month: new Date().toLocaleString('default', { month: 'long' }),
        daysInMonth: new Date(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0
        ).getDate(),

        selectedDates: [],
      };

      this.setState({
        activityName: '',
        activities: [...activities, newActivity],
      });
    }
  };

  handleSelected = (id, date) => {
    this.setState((prevState) => {
      let updatedActivities = prevState.activities.map((activity) => {
        if (activity.id === id) {
          let updatedSelectedDates = activity.selectedDates.includes(date)
            ? activity.selectedDates.filter((d) => d !== date)
            : [...activity.selectedDates, date];
          return { ...activity, selectedDates: updatedSelectedDates };
        }
        return activity;
      });
      return {
        activities: updatedActivities,
      };
    });
  };

  deleteItem = (id) => {
    this.setState((prevState) => {
      let updatedActivities = prevState.activities.filter((activity) => {
        return activity.id !== id;
      });

      return {
        activities: updatedActivities,
      };
    });
  };
  render(props) {
    const { activities, activityName } = this.state;
    return (
      <>
        <div className="text-center">
          <div className="flex-center">
            <input
              placeholder="Enter the activity"
              value={activityName}
              onChange={this.handleActivityChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  this.handleAddActivity();
                }
              }}
            />
            <button onClick={this.handleAddActivity}>Add Activity</button>
          </div>
          <div>
            <ul>
              {activities.map((activity, index) => (
                <li className="box flex-center" key={activity.id}>
                  <div className="flex justify-between">
                    <div className="flex-28 text-center flex-center flex-column box-2">
                      <h3 className="activity">{activity.name}</h3>
                      <h5 className="month">{activity.month}</h5>
                    </div>
                    <div className="flex-70 flex wrap  box-1">
                      {Array.from(
                        { length: activity.daysInMonth },
                        (_, dayIndex) => dayIndex + 1
                      ).map((day) => (
                        <div className="flex-10">
                          <p
                            onClick={() =>
                              this.handleSelected(activity.id, day)
                            }
                            className={`dates ${
                              activity.selectedDates.includes(day)
                                ? 'selected'
                                : ''
                            }`}
                            key={day}
                          >
                            {day}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p
                    className="btn"
                    onClick={() => this.deleteItem(activity.id)}
                  >
                    <img src="/images/cross1.png" alt="Delete" />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Activities;
