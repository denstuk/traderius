import React from "react";
import "./UserInfoConnectionsForm.scoped.sass";
import Switch from "react-switch";
import { IUser } from "../../../../../domain";
import { UsersApi } from "../../../../../infrastructure/api/users/users";

type UserInfoConnectionsForm = { user: IUser };

export const UserInfoConnectionsForm: React.FC<UserInfoConnectionsForm> = ({ user }: UserInfoConnectionsForm) => {
    const [automatedTradingEnabled, setAutomatedTradingEnabled] = React.useState(user.automatedTradingEnabled);
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(user.notificationEnabled);

    const handleChangeNotificationEnabled = async (next: boolean): Promise<void> => {
        await UsersApi.updateNotificationEnabled({ notificationEnabled: next });
        setNotificationsEnabled(next);
    }
    const handleChangeAutomatedTradingEnabled = async (next: boolean): Promise<void> => {
        await UsersApi.updateAutomatedTradingEnabled({ automatedTradingEnabled: next });
        setAutomatedTradingEnabled(next);
    }

    return <div className="user-connections-form">
        { user.tinkoffMarketTokenConnected && (
            <div className="switcher">
                <Switch
                    onChange={(next) => handleChangeAutomatedTradingEnabled(next)}
                    checked={automatedTradingEnabled}
                    className="react-switch"
                />
                <p>Подключить автоматическую торговлю</p>
            </div>
        ) }
        <div className="switcher">
            <Switch
                onChange={(next) => handleChangeNotificationEnabled(next)}
                checked={notificationsEnabled}
                className="react-switch"
            />
            <p>Подключить оповещения в Telegram</p>
        </div>
    </div>
}
