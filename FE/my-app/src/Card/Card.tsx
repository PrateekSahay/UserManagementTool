import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import React from 'react'
import './Card.scss'

 
interface ColorProp {
    numberOfUsers: number;
};

const SimpleCard = (props: ColorProp) => {    
        return (
            <div className='CardContainer'>
                <Card className= "card">
                    <CardContent>
                        <Typography className="CounterWrapper" color="textSecondary" gutterBottom>
                            <b className = "Counter">{props && props.numberOfUsers}</b>
                        </Typography>                        
                    </CardContent>    
                </Card>
            </div>
        );    
};

export { SimpleCard as default}